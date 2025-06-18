import {
    Box, Button, Typography, TextField, Radio, RadioGroup,
    FormControl, FormControlLabel, Divider, InputAdornment,
    Alert, Stack,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Delete } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type TeamMemberFormProps = {
    form: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        groups: number[];
    };
    fieldErrors: { [k: string]: string };
    loading: boolean;
    role: "regular" | "admin";
    setRole: (r: "regular" | "admin") => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    onDelete?: () => void;
    showDelete?: boolean;
    confirmOpen?: boolean;
    setConfirmOpen?: (v: boolean) => void;
};

export default function TeamMemberForm({
    form,
    fieldErrors,
    loading,
    role,
    setRole,
    handleChange,
    handleSubmit,
    onCancel,
    onDelete,
    showDelete = false,
    setConfirmOpen = () => { },
}: TeamMemberFormProps) {
    return (

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>

            <Button
                variant="text"
                color="inherit"
                startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 18 }} />}
                onClick={onCancel}
                sx={{
                    alignSelf: "flex-start",
                    mt: 1,
                    mb: 2,
                    ml: "-6px",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 15,
                    px: 1,
                    '&:hover': {
                        background: 'transparent',
                        textDecoration: 'underline',
                    },
                    color: "#3250bd"
                }}
            >
                Return
            </Button>

            <Divider sx={{ my: 1 }} />
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
                type="tel"
                value={form.phone_number}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 10 }}
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
            </Box>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    name="role"
                    value={role}
                    onChange={(e) => {
                        const selected = e.target.value as "regular" | "admin";
                        setRole(selected);
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
                        sx={{ pl: 1 }}
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
                        sx={{ pl: 1 }}
                    />
                </RadioGroup>
            </FormControl>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
                {showDelete && onDelete && setConfirmOpen ? (
                    <Button
                        type="button"
                        startIcon={<Delete />}
                        onClick={() => setConfirmOpen(true)}
                        disabled={loading}
                        color="error"
                        sx={{
                            fontWeight: 500,
                            textTransform: "none",
                            border: "1px solid #f44336",
                            px: 3,
                            py: 1.3,
                            borderRadius: 3,
                        }}
                    >
                        Delete
                    </Button>
                ) : (
                    <Box sx={{ width: 108 }} /> // Placeholder for delete button
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveAltIcon />}
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
                    }}
                >
                    Save
                </Button>
            </Box>
        </Stack>
    );
}