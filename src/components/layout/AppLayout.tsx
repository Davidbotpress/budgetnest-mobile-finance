
import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBreadcrumb?: boolean;
  loading?: boolean;
}

export function AppLayout({ children, title, showBreadcrumb = true, loading = false }: AppLayoutProps) {
  // Don't show breadcrumb for Panel (Dashboard) as it has custom header
  const shouldShowBreadcrumb = showBreadcrumb && title !== 'Panel';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-budget-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          {shouldShowBreadcrumb && (
            <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b border-budget-gray-200 px-3 md:px-4 bg-white sticky top-0 z-40">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {title && (
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-budget-gray-600 font-medium text-sm md:text-base">
                        {title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              )}
            </header>
          )}
          <main className="flex-1 pb-20 md:pb-4 overflow-auto">
            <ErrorBoundary>
              <div className="min-h-full">
                {children}
              </div>
            </ErrorBoundary>
          </main>
          <BottomNavigation />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
