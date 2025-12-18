import React from 'react';

const Footer: React.FC = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;

  return (
    <footer className="bg-slate-800 text-slate-400 px-6 py-2 text-xs text-right border-t border-slate-700">
      date : {formattedDate}
    </footer>
  );
};

export default Footer;