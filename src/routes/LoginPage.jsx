import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[radial-gradient(circle_at_center,_#FFF6D6_0%,_#DCE2FA_90%)] text-gray-900">
      {/* Floating Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold mb-4 text-center text-[#374151]"
      >
        Welcome to Komodo Hub 🦎
      </motion.h1>

      {/* Call to Action */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-[#4B5563] text-center mb-6 max-w-lg"
      >
        Join the conversation, share insights, and explore amazing stories.  
        <br /> Sign in to be part of the community!
      </motion.p>

      {/* Clerk Sign-In (Floating Modal) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg"
      >
        <SignIn signUpUrl="/register" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
