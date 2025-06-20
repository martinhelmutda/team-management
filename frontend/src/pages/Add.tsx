
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { MemberForm } from "../models";
import TeamMemberForm from "../components/TeamMemberForm";
import { parseApiError, validateMemberForm } from "../utils/validation";
import { useNotification } from "../context/NotificationContext";

export default function Add() {
    const [form, setForm] = useState<MemberForm>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        groups: [1],
    });
    const { setNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<"regular" | "admin">("regular");
    const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = validateMemberForm(form);
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/team-members/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setNotification({ type: "success", message: "Team member added!" });
                setTimeout(() => navigate("/"), 800);
            } else {
                setNotification({ type: "error", message: await parseApiError(res) });
            }
        } catch {
            setNotification({ type: "error", message: "Network error. Please try again." });
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
