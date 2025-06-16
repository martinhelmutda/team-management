import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Alert,
    Stack,
    InputAdornment,
    Divider,
    Typography,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";
import MainContainer from "../components/MainContainer";
import { Delete } from "@mui/icons-material";
import { MemberForm } from "../models";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

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
            <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <Box display="flex" alignItems="center" mb={1}>
                    <PersonOutlineIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                        Info
                    </Typography>
                </Box>
                <Box display="flex" gap={2} mb={0.5}>
                    <TextField
                        name="first_name"
                        placeholder="First name"
                        value={form.first_name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                        required
                        error={Boolean(fieldErrors.first_name)}
                        helperText={fieldErrors.first_name}
                    />
                    <TextField
                        name="last_name"
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                        required
                        error={Boolean(fieldErrors.last_name)}
                        helperText={fieldErrors.last_name}
                    />
                </Box>
                <TextField
                    name="email"
                    placeholder="Email address"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    required
                    error={Boolean(fieldErrors.email)}
                    helperText={fieldErrors.email}
                />
                <TextField
                    name="phone_number"
                    placeholder="Phone number"
                    value={form.phone_number}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    required
                    error={Boolean(fieldErrors.phone_number)}
                    helperText={fieldErrors.phone_number}
                />

                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" mb={1}>
                    <PersonOutlineIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                        Role
                    </Typography>
                </Box> {/* Role Title */}

                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        name="role"
                        value={role}
                        onChange={(e) => {
                            const selected = e.target.value as "regular" | "admin";
                            setRole(selected);
                            setForm(prev => prev && ({
                                    ...prev,
                                    groups: selected === "admin" ? [2] : [1],
                                }));
                        }}
                    >
                        <FormControlLabel
                            value="regular"
                            control={<Radio size="medium" />}
                            label={
                                <Box sx={{ pl: 1 }}>
                                    <Typography fontWeight={500} component="span">
                                        Regular
                                    </Typography>
                                    <Typography
                                        component="span"
                                        color="text.secondary"
                                        sx={{ ml: 1 }}
                                    >
                                        - Can’t delete members
                                    </Typography>
                                </Box>
                            }
                            sx={{
                                pl: 1,
                            }}
                        />
                        <FormControlLabel
                            value="admin"
                            control={<Radio size="medium" />}
                            label={
                                <Box sx={{ pl: 1 }}>
                                    <Typography fontWeight={500} component="span">
                                        Admin
                                    </Typography>
                                    <Typography
                                        component="span"
                                        color="text.secondary"
                                        sx={{ ml: 1 }}
                                    >
                                        - Can delete members
                                    </Typography>
                                </Box>
                            }
                            sx={{
                                pl: 1,
                            }}
                        />
                    </RadioGroup>
                </FormControl> {/* Role Section */}

                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                        variant="text"
                        color="inherit"
                        startIcon={<CloseIcon />}
                        onClick={() => navigate("/")}
                        sx={{
                            fontWeight: 500,
                            textTransform: "none",
                            border: "1px solid #ccc",
                            px: 3,
                            py: 1.3,
                            borderRadius: 3,
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Box>
                        <Button
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                            disabled={loading}
                            startIcon={<Delete />}
                            sx={{
                                color: "red",
                                fontWeight: 500,
                                textTransform: "none",
                                minWidth: 120,
                                borderRadius: 3,
                                px: 3,
                                py: 1.3,
                                border: "1px solid #ccc",
                                mr: 3,
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveAltIcon />}
                            onClick={handleSubmit}
                            disabled={loading}
                            sx={{
                                minWidth: 120,
                                fontWeight: 500,
                                borderRadius: 3,
                                textTransform: "none",
                                px: 3,
                                py: 1.3,
                                boxShadow: "0 1px 6px rgba(64,126,255,0.09)",
                                background: " #4171fa",
                                mr: 1,
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>{/* Buttons Row */}

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

            </Stack>
        </MainContainer>
    );
}
