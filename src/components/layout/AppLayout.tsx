
import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBreadcrumb?: boolean;
}

export function AppLayout({ children, title, showBreadcrumb = true }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {showBreadcrumb && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-budget-gray-200 px-4 bg-white">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {title && (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-budget-gray-600 font-medium">
                        {title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}
            </header>
          )}
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <BottomNavigation />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
