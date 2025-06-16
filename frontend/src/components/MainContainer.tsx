import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

type MainContainerProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

export default function MainContainer({ title, subtitle, children }: MainContainerProps) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    maxWidth: 640,
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        background: "#4171fa",
                        p: 4,
                        pb: 3,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                >
                    <Typography variant="h4" fontWeight={700} sx={{ color: "#fff", mb: 0.5 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography sx={{ color: "#eaf4fd" }}>{subtitle}</Typography>
                    )}
                </Box>{/* Header */}

                <Box sx={{ p: { xs: 2, sm: 4 } }}>{children}</Box>{/* Conetnet */}
            </Paper>
        </Box>
    );
}