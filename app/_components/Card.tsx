import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as CardUI
} from '@/components/ui/card';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
};

export function Card({
  children,
  title,
  description,
  footer,
  className
}: CardProps) {
  return (
    <CardUI className={twMerge('', className)}>
      {(title || description) && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </CardUI>
  );
}
