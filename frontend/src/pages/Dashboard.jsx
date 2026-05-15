import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDownloadStore, useAuthStore } from '../store';
import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { BsCheckCircle, BsXCircle, BsClockHistory } from 'react-icons/bs';

const Dashboard = () => {
  const navigate = useNavigate();
  const { downloads, getHistory } = useDownloadStore();
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await getHistory();
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistory]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <BsCheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <BsXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <BsClockHistory className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
          <motion.button
            onClick={() => {
              logout();
              navigate('/');
            }}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Total Downloads', value: downloads.length, color: 'from-cyan-500' },
            { label: 'Completed', value: downloads.filter(d => d.status === 'completed').length, color: 'from-green-500' },
            { label: 'In Progress', value: downloads.filter(d => d.status === 'downloading').length, color: 'from-blue-500' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-6 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-400 mb-2">{stat.label}</p>
              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} to-transparent bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Download History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6">Download History</h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : downloads.length === 0 ? (
            <div className="text-center py-12">
              <AiOutlineDownload className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 mb-6">No downloads yet</p>
              <motion.button
                onClick={() => navigate('/download')}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold"
              >
                Start Downloading
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">File</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Format</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Quality</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((download) => (
                    <motion.tr
                      key={download._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <td className="py-3 px-4 text-white">{download.fileName || 'Media'}</td>
                      <td className="py-3 px-4 text-gray-300">{download.format.toUpperCase()}</td>
                      <td className="py-3 px-4 text-gray-300">{download.quality}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(download.status)}
                          <span className="text-gray-300 capitalize">{download.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(download.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {download.status === 'completed' ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-cyan-500 hover:text-cyan-400"
                          >
                            <AiOutlineDownload className="w-5 h-5" />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-red-500 hover:text-red-400"
                          >
                            <AiOutlineDelete className="w-5 h-5" />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
