import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineDownload, AiOutlineVideo, AiOutlineAudio } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AiOutlineVideo className="w-12 h-12" />,
      title: 'Video Downloads',
      description: 'Download videos from Instagram, TikTok, YouTube, Twitter, Facebook and more'
    },
    {
      icon: <BsImage className="w-12 h-12" />,
      title: 'Image Downloads',
      description: 'Extract and download high-quality images with one click'
    },
    {
      icon: <AiOutlineAudio className="w-12 h-12" />,
      title: 'Audio Extraction',
      description: 'Convert videos to MP3, WAV, AAC and other audio formats'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/20 border-b border-white/10 sticky top-0 z-50">
        <motion.div
          className="text-3xl font-bold text-gradient flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <IoSparkles className="w-8 h-8" />
          Video Down
        </motion.div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-lg border border-white/20 hover:border-cyan-500 transition-all hover:bg-white/5"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="px-8 py-24 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Download From Any <span className="text-gradient">Social Media</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The ultimate platform for downloading videos, images, and audio from all major social media platforms. Beautiful UI, powerful features, and codec conversion.
          </p>
          <motion.button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
        </motion.div>

        {/* Demo/Preview */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 p-1"
        >
          <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-12 text-center">
            <AiOutlineDownload className="w-20 h-20 mx-auto mb-4 text-cyan-500" />
            <p className="text-xl text-gray-400">Ready to download? Sign in to get started</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="px-8 py-24 bg-black/50 border-t border-white/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
            Powerful Features
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="text-cyan-500 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Platforms Section */}
      <motion.section
        className="px-8 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
            Supported Platforms
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook', 'Snapchat', 'Pinterest', 'LinkedIn'].map((platform, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass rounded-xl p-4 text-center hover:scale-105 transition-transform"
              >
                <p className="font-semibold">{platform}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-8 py-24 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-t border-white/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-8">
            Ready to Download?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8">
            Join thousands of users downloading media from their favorite platforms
          </motion.p>
          <motion.button
            onClick={() => navigate('/register')}
            variants={itemVariants}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Start Now - It's Free
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/10 text-center text-gray-500">
        <p>&copy; 2024 Video Down. Made with ❤️ by ayanarshad</p>
      </footer>
    </div>
  );
};

export default Home;
