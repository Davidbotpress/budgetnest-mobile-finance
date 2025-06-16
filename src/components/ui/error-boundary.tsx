
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-red-900">Algo salió mal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-budget-gray-600">
                Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
              </p>
              {this.state.error && (
                <details className="text-xs text-left text-budget-gray-500 bg-budget-gray-50 p-2 rounded">
                  <summary className="cursor-pointer">Detalles del error</summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <Button onClick={this.handleRetry} className="w-full">
                Intentar de nuevo
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorMessage({ 
  title = "Error", 
  message, 
  onRetry 
}: { 
  title?: string; 
  message: string; 
  onRetry?: () => void; 
}) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
            >
              Reintentar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
