import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-mono uppercase tracking-[0.15em] font-medium',
    'transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0",
    'outline-none focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'aria-invalid:border-destructive aria-invalid:ring-destructive/30',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background hover:bg-foreground/85',
        outline:
          'bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background',
        accent: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border',
        ghost: 'bg-transparent text-foreground hover:bg-secondary',
        link: 'font-serif italic normal-case tracking-normal text-foreground p-0 h-auto border-b-[1.5px] border-primary hover:text-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30',
      },
      size: {
        default: 'h-11 px-6 text-[11px] rounded-none',
        sm: 'h-9  px-4 text-[10px] rounded-none',
        lg: 'h-14 px-8 text-xs    rounded-none',
        xl: 'h-16 px-10 text-xs    rounded-none',
        icon: 'size-11 rounded-none',
        'icon-sm': 'size-9 rounded-none',
        'icon-lg': 'size-14 rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
