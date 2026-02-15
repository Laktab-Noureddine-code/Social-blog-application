import { Link } from "react-router-dom";

function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  image = "/landing/illustration.png", 
  welcomeTitle = "Welcome Back", 
  welcomeSubtitle = "Connect with friends and the world around you on SocialApp." 
}) {
  return (
    <div className="max-h-screen flex w-full">
      {/* Left Side - Blue Background (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#cce5fb] flex-col items-center justify-center relative overflow-hidden p-10 text-white">
        <div className="z-10 text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-2">{welcomeTitle}</h1>
          <p className="text-lg mb-2">{welcomeSubtitle}</p>
          
          <div className="relative w-full max-w-md mx-auto aspect-square">
             {/* Illustration */}
            <img 
              src={image} 
              alt="Authentication Illustration" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Background decorations could go here */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 right-10 w-20 h-20 rounded-full border-4 border-white"></div>
           <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - White Background */}
      <div className="max-h-screen w-full lg:w-1/2 bg-white flex flex-col sm:p-2 lg:p-5 overflow-y-auto">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link to="/" className="">
             <img src="/logo.png" alt="Logo" className="h-17 w-auto" />
          </Link>
        </div>

        <div className="max-h-screen w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          {children}
          
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
