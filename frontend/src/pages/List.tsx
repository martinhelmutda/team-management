import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    Stack,
    Chip,
    IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import MainContainer from "../components/MainContainer";
import { Member } from "../models";


function initials(first: string, last: string) {
    return (first[0] ?? "").toUpperCase() + (last[0] ?? "").toUpperCase();
}

export default function List() {
    const [members, setMembers] = useState<Member[]>([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/team-members/`)
            .then((res) => res.json())
            .then((data: Member[]) => setMembers(data));
    }, []);

    return (
        <MainContainer
            title="Team Members"
            subtitle={`You have ${members.length} team member(s).`}
        >


            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 3 }}>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    sx={{
                        background: "#4171fa",
                        color: "#fff",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        boxShadow: "0 2px 10px rgba(70, 120, 255, 0.13)",
                        textTransform: "none",
                        fontSize: { xs: 16, sm: 18 },
                        width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => navigate("/add")}
                >
                    Add Team Member
                </Button>
            </Box>


            <Box>
                <Stack spacing={2}>
                    {members.map((member) => (
                        <Paper
                            key={member.id}
                            sx={{
                                p: { xs: 1.5, sm: 2.5 },
                                borderRadius: 3,
                                display: "flex",
                                alignItems: "center",
                                boxShadow: "0 2px 8px rgba(40,64,247,0.3)",
                                background: "rgba(247, 249, 251, 0.85)",
                                // flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: 1.5, sm: 0 },
                            }}
                            elevation={0}
                        >

                            <Avatar
                                sx={{
                                    width: { xs: 44, sm: 54 },
                                    height: { xs: 44, sm: 54 },
                                    bgcolor: "#6583f7",
                                    fontWeight: 700,
                                    fontSize: { xs: 18, sm: 22 },
                                    mr: { xs: 1, sm: 2.5 },
                                    mb: { xs: 1, sm: 0 },
                                    display: { xs: "none", sm: "flex" },
                                }}
                            >
                                {initials(member.first_name, member.last_name)}
                            </Avatar>

                            <Box sx={{
                                flex: 1,
                                width: "100%",
                            }}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        display: "flex",
                                        alignItems: { xs: "right", sm: "center" },
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: "flex-start",
                                        mb: 1,
                                        gap: { xs: 0.5, sm: 1 },
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        align="left"
                                    >
                                        {member.first_name} {member.last_name}
                                    </Typography>

                                    {member.groups.includes(2) && (
                                        <Chip
                                            label="admin"
                                            size="small"
                                            sx={{
                                                bgcolor: "#ffb300",
                                                color: "#fff",
                                                fontWeight: 700,
                                                fontSize: 14,
                                                ml: 0.5,
                                                px: 0.8,
                                                height: { xs: 20, sm: 24 },
                                                textTransform: "capitalize",
                                                letterSpacing: 0.3,
                                                maxWidth: 80,
                                                borderRadius: 1,
                                            }}
                                        />
                                    )}
                                </Stack>
                                <Stack
                                    // alignItems="center"
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        gap: { xs: 1, sm: 3 },
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={0.7}>
                                        <PhoneIcon sx={{ color: "#6583f7", fontSize: 20 }} />
                                        <Typography color="text.secondary" fontSize={15}>
                                            {member.phone_number}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={0.7}>
                                        <EmailIcon sx={{ color: "#6583f7", fontSize: 20 }} />
                                        <Typography color="text.secondary" fontSize={15}>
                                            {member.email}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>

                            <IconButton
                                onClick={() => navigate(`/edit/${member.id}`)}
                                sx={{
                                    color: "#7386a1",
                                    ml: 1,
                                    "&:hover": {
                                        color: "#2964f7",
                                    },
                                }}
                                aria-label="Edit"
                            >
                                <EditOutlinedIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </Paper>
                    ))}
                </Stack>
            </Box>{/* Member List */}
        </MainContainer>
    );
}