import React from 'react';
import { BaseComponentProps } from '@/types/common';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps extends BaseComponentProps {
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: any;
  footerProps?: any;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps = {},
  footerProps = {},
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showHeader && <Header {...headerProps} />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
};

export default Layout;
