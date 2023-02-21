import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <p>&copy; 2023 React Wizards</p>
    </motion.footer>
  );
}

export default Footer;
