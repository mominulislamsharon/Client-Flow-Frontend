import React from 'react';

const Navbar = () => {
  return (
    
      <header className='h-16 border-b border-slate-800 flex items-center justify-between px-6'>
        <h2 className='text-lg font-semibold'>
          Dashboard
        </h2>

        <div className='flex items-center gap-4'>
          <span className='text-sm text-slate-400'>
            Welcome back
          </span>
        </div>
      </header>
  );
};

export default Navbar;