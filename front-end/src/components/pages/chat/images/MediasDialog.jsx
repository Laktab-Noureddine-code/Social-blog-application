/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    styled
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Create a styled component for masonry layout
const MasonryBox = styled('div')(({ theme }) => ({
    columnCount: 4,
    columnGap: '1rem',
    '& img': {
        width: '100%',
        marginBottom: '1rem',
        display: 'block',
        breakInside: 'avoid',
        borderRadius: '8px',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.02)',
            cursor: 'pointer'
        }
    },
    [theme.breakpoints.down('lg')]: {
        columnCount: 3,
    },
    [theme.breakpoints.down('md')]: {
        columnCount: 2,
    },
    [theme.breakpoints.down('sm')]: {
        columnCount: 1,
    }
}));

export default function MediasDialog({ isOpen, setIsOpen, mediaUrls }) {
    const handleClose = () => {
        setIsOpen(false);
    };
    // console.log(mediaUrls)

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="xl"  // Changed to xl for more space
            PaperProps={{
                sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    position: "relative",
                    height: '80vh',  // Fixed height for the dialog
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
                    zIndex: 1,
                    "&:hover": {
                        backgroundColor: "#cfcfcf",
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ overflowY: 'auto', padding: 3 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <h2 className="text-xl font-bold">All Attachments</h2>
                    <p className="text-gray-600">{mediaUrls.length} images</p>
                </Box>

                <MasonryBox>
                    {mediaUrls.map((url, index) => (
                        <img
                            key={index}
                            src={"http://localhost:8000/storage/"+url}
                            alt={`attachment-${index}`}
                            loading="lazy"
                            onClick={() => {
                                // Optional: You could add a feature to view single image in full here
                            }}
                        />
                    ))}
                </MasonryBox>
            </DialogContent>
        </Dialog>
    );
}