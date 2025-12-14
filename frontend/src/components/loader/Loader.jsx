import ContentLoader from "react-content-loader";

const MyLoader = ({
    type = 'default',  // You can choose different types (default, profile, list, etc.)
    width,       // Default width
    height = 200,      // Default height    
    speed = 3,         // Animation speed
    backgroundColor = '#f3f3f3',  // Background color
    foregroundColor = '#ecebeb',   // Foreground color
}) => {
    const loaders = {
        default: (
            <ContentLoader
                // viewBox="0 0 400 160"
                height={height}
                width="100%"
                speed={speed}   // Pass speed
                backgroundColor={backgroundColor} // Pass bg color
                foregroundColor={foregroundColor} // Pass fg color
            >
                <rect x="0" y="13" rx="4" ry="4" width={width} height="10" />
                <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
                <rect x="0" y="50" rx="4" ry="4" width={width} height="10" />
                <rect x="0" y="65" rx="4" ry="4" width={width} height="10" />
                <rect x="0" y="79" rx="4" ry="4" width={width} height="10" />
                <rect x="0" y="99" rx="5" ry="5" width={width} height="500" />
            </ContentLoader>
        ),
        profile: (<ContentLoader
            height={600}
            width='100%'
            backgroundColor="#d9d9d9"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="20" rx="0" ry="0" width="100%" height="300" />
            <circle cx="140" cy="120" r="50" />
            <rect x="290" y="20" rx="0" ry="0" width="100" height="50" />
            <rect x="290" y="75" rx="0" ry="0" width="70" height="5" />
            <rect x="290" y="85" rx="0" ry="0" width="40" height="6" />
        </ContentLoader>)
    };

    return loaders[type] || loaders.default;
}

export default MyLoader;
