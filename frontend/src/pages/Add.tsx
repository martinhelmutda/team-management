
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { MemberForm } from "../models";
import TeamMemberForm from "../components/TeamMemberForm";



export default function Add() {
    const [form, setForm] = useState<MemberForm>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        groups: [1],
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<"regular" | "admin">("regular");
    const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors: { [k: string]: string } = {};

        // Validate fields
        if (!form.first_name.trim()) {
            errors.first_name = "First name is required";
        }
        if (!form.last_name.trim()) {
            errors.last_name = "Last name is required";
        }
        if (!form.email.trim()) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email)) {
                errors.email = "Please enter a valid email address";
            }
        }
        if (!form.phone_number.trim()) {
            errors.phone_number = "Phone number is required";
        } else {
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(form.phone_number)) {
                errors.phone_number = "Phone number must contain only digits";
            }
        }

        setFieldErrors(errors);
        setError(null);
        setSuccess(null);

        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/team-members/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setSuccess("Team member added!");
                setTimeout(() => navigate("/"), 800);
            } else {
                const data = await res.json();
                setError(data?.detail || "Failed to add team member. Please try again.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer
            title="New Member"
            subtitle={`Set info to add team member.`}
        >
            <TeamMemberForm
                form={form}
                fieldErrors={fieldErrors}
                error={error}
                success={success}
                loading={loading}
                role={role}
                setRole={(selected) => {
                    setRole(selected);
                    setForm((prev) => ({
                        ...prev,
                        groups: selected === "admin" ? [2] : [1],
                    }));
                }}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                onCancel={() => navigate("/")}
            />
        </MainContainer>
    );
}
