import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { MemberForm } from "../models";
import TeamMemberForm from "../components/TeamMemberForm";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";

export default function Edit() {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<MemberForm | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<"regular" | "admin">("regular");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/team-members/${id}/`)
            .then((res) => res.json())
            .then((data: MemberForm) => {
                setForm(data);
                setRole(data.groups && data.groups.includes(2) ? "admin" : "regular");
            })
    }, [id]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!form) return;
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        setError(null);
        setSuccess(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form) return;
        const errors: { [k: string]: string } = {};
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
            const res = await fetch(`${API_URL}/team-members/${id}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSuccess("Team member updated!");
                setTimeout(() => navigate("/"), 800);
            } else {
                const data = await res.json();
                setError(data?.detail || "Failed to update. Please try again.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/team-members/${id}/`, {
                method: "DELETE",
            });
            if (res.ok) {
                navigate("/");
            } else {
                setError("Failed to delete. Please try again.");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!form) return <div>Loading...</div>;

    return (
        <MainContainer title="Edit Member" subtitle="Update info for team member.">
            <TeamMemberForm
                form={form}
                fieldErrors={fieldErrors}
                error={error}
                success={success}
                loading={loading}
                role={role}
                setRole={(selected) => {
                    setRole(selected);
                    setForm((prev) => prev && ({
                        ...prev,
                        groups: selected === "admin" ? [2] : [1],
                    }));
                }}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                onCancel={() => navigate("/")}
                onDelete={handleDelete}
                showDelete={true}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this team member? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            setConfirmOpen(false);
                            await handleDelete();
                        }}
                        color="error"
                        disabled={loading}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContainer>
    );
}
