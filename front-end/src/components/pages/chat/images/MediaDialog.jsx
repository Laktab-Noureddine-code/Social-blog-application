/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MediaDialog({ isOpen, setIsOpen, mediaUrl }) {
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    position: "relative",
                },
            }}
        >
            {/* Custom Close Button */}
            <IconButton
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: "#e0e0e0",
                    color: "#333",
                    "&:hover": {
                        backgroundColor: "#cfcfcf",
                    },
                }}
            >
                <CloseIcon />
            </IconButton>


            <DialogContent>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <img
                        src={mediaUrl}
                        alt="media"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "80vh",
                            objectFit: "contain",
                            borderRadius: "8px",
                        }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
