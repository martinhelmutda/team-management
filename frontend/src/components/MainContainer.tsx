import { Box, Typography } from "@mui/material";
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
                width: "100vw",
                background: "#f7f9fb",
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    background: "linear-gradient(135deg, #4171fa 0%,#000000 100%)",
                    px: { xs: 2, sm: 4 },
                    pt: { xs: 3, sm: 5 },
                    pb: { xs: 2, sm: 4 },
                }}
            >
                <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", fontSize: { xs: 24, sm: 32 }, mb: 0.5 }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography sx={{ color: "#eaf4fd", fontSize: { xs: 15, sm: 18 } }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>{/* Header */}

            <Box sx={{
                p: { xs: 2, sm: 4 },
                maxWidth: 640,
                mx: "auto"
            }}>
                {children}
            </Box>{/* Content */}
        </Box>
    );
}