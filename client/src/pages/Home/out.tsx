"use client";

import React from "react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
  memo,
} from "react";
import {
  Heart,
  Home,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  X,
  Check,
  Download,
  Mail,
  Sparkles,
  Package,
  Gift,
  Zap,
  Flame,
  Crown,
  Palette,
  Brush,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const GoogleFontImport = () => {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

      :root {
        --font-heading: "Lora", serif;
        --font-body: "Montserrat", sans-serif;
      }

      html,
      body {
        font-family: var(--font-body);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: var(--font-heading);
      }
    `}</style>
  );
};

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses =
    variant === "outline" ? "border" : "bg-pink-100 text-pink-800";
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    default:
      "bg-pink-500 text-white hover:bg-pink-600 disabled:hover:bg-pink-500",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 disabled:hover:bg-transparent",
    ghost: "bg-transparent hover:bg-gray-100 disabled:hover:bg-transparent",
    link: "bg-transparent underline-offset-4 hover:underline p-0 h-auto disabled:no-underline",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-10 w-10",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const Input = ({
  id,
  placeholder,
  className = "",
  type = "text",
  value,
  onChange,
  required = false,
  onBlur,
  onFocus,
}: {
  id?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

const Label = ({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
      {children}
    </label>
  );
};

const Separator = ({ className = "" }: { className?: string }) => {
  return <div className={`h-[1px] w-full bg-gray-200 ${className}`} />;
};

const Textarea = ({
  id,
  className = "",
  value,
  onChange,
  required = false,
  onBlur,
  onFocus,
}: {
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}) => {
  return (
    <textarea
      id={id}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
      value={value}
      onChange={onChange}
      required={required}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

const Sheet = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 animate-fadeIn"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
};

const SheetContent = ({
  children,
  side = "right",
  className = "",
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) => {
  const sideClasses = {
    left: "left-0 animate-slideInLeft",
    right: "right-0 animate-slideInRight",
  };

  return (
    <div
      className={`fixed ${sideClasses[side]} top-0 h-full w-full max-w-md bg-white p-6 shadow-lg sm:max-w-md ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

const SheetHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`mb-6 ${className}`}>{children}</div>;
};

const SheetTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const cartState = useMemo(() => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total,
      itemCount,
      isEmpty: items.length === 0,
    };
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex >= 0) {
        toast.success(`Quantity increased for ${product.name}`);
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return {
    ...cartState,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
};

type FieldConfig = {
  initialValue: string;
  validation?: ValidationRule;
};

type FormConfig = Record<string, FieldConfig>;

function useForm<T extends FormConfig>(config: T) {
  const initialValues = useMemo(() => {
    const values = {} as Record<keyof T, string>;
    Object.keys(config).forEach((key) => {
      values[key as keyof T] = config[key].initialValue;
    });
    return values;
  }, [config]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean | undefined>>(
    {} as Record<keyof T, boolean | undefined>
  );
  const [isSubmitting, setSubmitting] = useState(false);

  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => values[key as keyof T] !== initialValues[key as keyof T]
    );
  }, [values, initialValues]);

  const validateField = useCallback(
    (field: keyof T): boolean => {
      const value = values[field];
      const rules = config[field].validation;

      if (!rules) return true;

      if (rules.required && (!value || value.trim() === "")) {
        setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
        return false;
      }

      if (rules.minLength && value.length < rules.minLength) {
        setErrors((prev) => ({
          ...prev,
          [field]: `Minimum length is ${rules.minLength} characters`,
        }));
        return false;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        setErrors((prev) => ({
          ...prev,
          [field]: `Maximum length is ${rules.maxLength} characters`,
        }));
        return false;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        setErrors((prev) => ({ ...prev, [field]: "Invalid format" }));
        return false;
      }

      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          setErrors((prev) => ({ ...prev, [field]: customError }));
          return false;
        }
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    },
    [values, config]
  );

  const validate = useCallback((): boolean => {
    let isFormValid = true;
    Object.keys(config).forEach((field) => {
      const fieldValid = validateField(field as keyof T);
      if (!fieldValid) isFormValid = false;
    });
    return isFormValid;
  }, [config, validateField]);

  const getField = useCallback(
    (field: keyof T) => ({
      value: values[field],
      error: errors[field],
      touched: touched[field] || false,
      onChange: (value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      },
      onBlur: () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field);
      },
      onFocus: () => {},
    }),
    [values, errors, touched, validateField]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string | undefined>);
    setTouched({} as Record<keyof T, boolean | undefined>);
    setSubmitting(false);
  }, [initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    isSubmitting,
    setSubmitting,
    validate,
    validateField,
    getField,
    reset,
  };
}

const FormField = memo(
  ({
    label,
    id,
    field,
    type = "text",
    placeholder,
    as = "input",
    options,
    className = "",
    required = false,
  }: {
    label: string;
    id: string;
    field: {
      value: string;
      error?: string;
      touched: boolean;
      onChange: (value: string) => void;
      onBlur: () => void;
      onFocus: () => void;
    };
    type?: string;
    placeholder?: string;
    as?: "input" | "textarea" | "select";
    options?: Array<{ value: string; label: string }>;
    className?: string;
    required?: boolean;
  }) => {
    const baseClassName = `w-full ${
      field.error ? "border-red-500 focus:border-red-500" : ""
    } ${className}`;

    const renderInput = () => {
      switch (as) {
        case "textarea":
          return (
            <Textarea
              id={id}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              onFocus={field.onFocus}
              className={baseClassName}
              required={required}
            />
          );

        case "select":
          return (
            <select
              id={id}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              onFocus={field.onFocus}
              className={`${baseClassName} h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
              required={required}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        default:
          return (
            <Input
              id={id}
              type={type}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              onFocus={field.onFocus}
              placeholder={placeholder}
              className={baseClassName}
              required={required}
            />
          );
      }
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {renderInput()}
        {field.error && field.touched && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {field.error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

const CheckoutProgress = memo(
  ({
    steps,
    currentStep,
    onStepClick,
  }: {
    steps: Array<{ id: string; title: string; description: string }>;
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
  }) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={index > currentStep}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${
                    index < currentStep
                      ? "bg-green-500 border-green-500 text-white"
                      : index === currentStep
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }
                  ${
                    onStepClick && index <= currentStep
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-default"
                  }
                `}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>

              {index < steps.length - 1 && (
                <div
                  className={`
                    w-16 h-0.5 mx-2 transition-colors
                    ${index < currentStep ? "bg-green-500" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{steps[currentStep]?.title}</h2>
          <p className="text-gray-600 text-sm">
            {steps[currentStep]?.description}
          </p>
        </div>
      </div>
    );
  }
);

CheckoutProgress.displayName = "CheckoutProgress";

const OrderSummary = memo(
  ({
    summary,
  }: {
    summary: {
      subtotal: number;
      tax: number;
      shipping: number;
      total: number;
      items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
        total: number;
      }>;
    };
  }) => {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 max-h-60 overflow-auto">
            {summary.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-medium">${item.total.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>
                {summary.shipping === 0
                  ? "Free"
                  : `$${summary.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${summary.tax.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

OrderSummary.displayName = "OrderSummary";

const OrderComplete = memo(
  ({
    orderId,
    onContinueShopping,
  }: {
    orderId: string | null;
    onContinueShopping: () => void;
  }) => {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed
            and will be processed shortly.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">3-5 business days</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tracking</p>
                <p className="font-medium">Will be sent via email</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onContinueShopping}
            className="bg-pink-500 hover:bg-pink-600"
          >
            Continue Shopping
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Receipt
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>What&apos;s next?</strong> You&apos;ll receive an email
            confirmation shortly with your order details and tracking
            information.
          </p>
        </div>
      </div>
    );
  }
);

OrderComplete.displayName = "OrderComplete";

function useCheckout(cart: ReturnType<typeof useCart>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const checkoutSteps = [
    {
      id: "shipping",
      title: "Shipping Information",
      description: "Enter your delivery details",
      fields: [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
        "country",
      ],
    },
    {
      id: "payment",
      title: "Payment Details",
      description: "Secure payment information",
      fields: ["cardNumber", "expiryDate", "cvv", "cardholderName"],
    },
    {
      id: "review",
      title: "Review Order",
      description: "Confirm your purchase",
      fields: ["saveInfo", "newsletter"],
    },
  ];

  const formConfig = {
    firstName: {
      initialValue: "",
      validation: { required: true, minLength: 2 },
    },
    lastName: {
      initialValue: "",
      validation: { required: true, minLength: 2 },
    },
    email: {
      initialValue: "",
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value: string) => {
          if (!value.includes("@")) return "Please enter a valid email address";
          return null;
        },
      },
    },
    phone: {
      initialValue: "",
      validation: {
        required: true,
        pattern: /^\+?[\d\s\-()]+$/,
        minLength: 10,
      },
    },
    address: {
      initialValue: "",
      validation: { required: true, minLength: 5 },
    },
    city: {
      initialValue: "",
      validation: { required: true, minLength: 2 },
    },
    state: {
      initialValue: "",
      validation: { required: true, minLength: 2 },
    },
    zipCode: {
      initialValue: "",
      validation: {
        required: true,
        pattern: /^\d{5}(-\d{4})?$/,
        custom: (value: string) => {
          if (!/^\d{5}(-\d{4})?$/.test(value))
            return "Please enter a valid ZIP code";
          return null;
        },
      },
    },
    country: {
      initialValue: "US",
      validation: { required: true },
    },
    cardNumber: {
      initialValue: "",
      validation: {
        required: true,
        custom: (value: string) => {
          const cleaned = value.replace(/\s/g, "");
          if (!/^\d{16}$/.test(cleaned))
            return "Please enter a valid 16-digit card number";
          return null;
        },
      },
    },
    expiryDate: {
      initialValue: "",
      validation: {
        required: true,
        pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        custom: (value: string) => {
          if (value.length === 2 && !value.includes("/")) {
            return `${value}/`;
          }
          if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
            return "Please enter expiry date in MM/YY format";
          }
          const [month, year] = value.split("/");
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear() % 100;
          const currentMonth = currentDate.getMonth() + 1;

          if (
            Number.parseInt(year) < currentYear ||
            (Number.parseInt(year) === currentYear &&
              Number.parseInt(month) < currentMonth)
          ) {
            return "Card has expired";
          }
          return null;
        },
      },
    },
    cvv: {
      initialValue: "",
      validation: {
        required: true,
        pattern: /^\d{3,4}$/,
        custom: (value: string) => {
          if (!/^\d{3,4}$/.test(value)) return "Please enter a valid CVV";
          return null;
        },
      },
    },
    cardholderName: {
      initialValue: "",
      validation: { required: true, minLength: 2 },
    },
    saveInfo: {
      initialValue: "false",
      validation: {},
    },
    newsletter: {
      initialValue: "false",
      validation: {},
    },
  };

  const form = useForm(formConfig);

  const orderSummary = useMemo(
    () => ({
      subtotal: cart.total,
      tax: cart.total * 0.08,
      shipping: cart.total > 50 ? 0 : 9.99,
      total: cart.total + cart.total * 0.08 + (cart.total > 50 ? 0 : 9.99),
      items: cart.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
    }),
    [cart.total, cart.items]
  );

  const validateCurrentStep = useCallback((): boolean => {
    const currentStepConfig = checkoutSteps[currentStep];
    if (!currentStepConfig) return false;

    let isStepValid = true;
    currentStepConfig.fields.forEach((field) => {
      const fieldValid = form.validateField(field as keyof typeof formConfig);
      if (!fieldValid) isStepValid = false;
    });

    return isStepValid;
  }, [currentStep, form]);

  const nextStep = useCallback(() => {
    if (!validateCurrentStep()) return false;

    if (currentStep < checkoutSteps.length - 1) {
      startTransition(() => {
        setCurrentStep((prev) => prev + 1);
      });
      return true;
    }
    return false;
  }, [currentStep, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      startTransition(() => {
        setCurrentStep((prev) => prev - 1);
      });
      return true;
    }
    return false;
  }, [currentStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < checkoutSteps.length) {
      startTransition(() => {
        setCurrentStep(stepIndex);
      });
    }
  }, []);

  const processOrder = useCallback(async (): Promise<boolean> => {
    if (!form.validate()) return false;

    setIsProcessing(true);
    form.setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newOrderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      startTransition(() => {
        setOrderId(newOrderId);
        setOrderComplete(true);
        cart.clearCart();
        form.reset();
      });

      return true;
    } catch (error) {
      console.error("Order processing failed:", error);
      return false;
    } finally {
      setIsProcessing(false);
      form.setSubmitting(false);
    }
  }, [form, cart]);

  const resetCheckout = useCallback(() => {
    startTransition(() => {
      setCurrentStep(0);
      setIsProcessing(false);
      setOrderComplete(false);
      setOrderId(null);
      form.reset();
    });
  }, [form]);

  return {
    currentStep,
    steps: checkoutSteps,
    isProcessing,
    orderComplete,
    orderId,
    isPending,
    orderSummary,
    form,
    nextStep,
    prevStep,
    goToStep,
    processOrder,
    resetCheckout,
    validateCurrentStep,
    canGoNext: currentStep < checkoutSteps.length - 1,
    canGoPrev: currentStep > 0,
    isLastStep: currentStep === checkoutSteps.length - 1,
    currentStepConfig: checkoutSteps[currentStep],
  };
}

const CheckoutForm = memo(
  ({
    cart,
    setActiveTab,
  }: {
    cart: ReturnType<typeof useCart>;
    setActiveTab: (tab: string) => void;
  }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    if (cart.isEmpty) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShoppingBag className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Button onClick={() => setActiveTab("products")}>
            Browse Products
          </Button>
        </div>
      );
    }

    const handleCheckout = async () => {
      setIsProcessing(true);
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Order placed successfully! Thank you for your purchase.");
      cart.clearCart();
      setActiveTab("products");
      setIsProcessing(false);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <p className="text-gray-600">Review your order and complete your purchase</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-pink-500 hover:bg-pink-600"
              size="lg"
            >
              {isProcessing ? "Processing..." : "Complete Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
);

CheckoutForm.displayName = "CheckoutForm";

const products: Product[] = [
  {
    id: 1,
    name: "Pastel Tote Bag",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1521411086197-4f459beee413?q=80&w=2657&auto=format&fit=crop",
    category: "Accessories",
    description:
      "A stylish tote bag in soft pastel colors, perfect for everyday use.",
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: "Emily",
        rating: 5,
        comment:
          "Love this bag! The color is beautiful and it's very spacious.",
        date: "2023-10-15",
      },
      {
        id: 2,
        user: "Michael",
        rating: 4,
        comment: "Great quality, but slightly smaller than I expected.",
        date: "2023-09-28",
      },
    ],
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=3180&auto=format&fit=crop",
    category: "Accessories",
    description:
      "A sleek minimalist watch with a pastel band that complements any outfit.",
    rating: 4.8,
    reviews: [
      {
        id: 3,
        user: "Sarah",
        rating: 5,
        comment: "Absolutely love this watch! It's elegant and comfortable.",
        date: "2023-10-05",
      },
    ],
  },
  {
    id: 3,
    name: "Soft Knit Sweater",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=3164&auto=format&fit=crop",
    category: "Clothing",
    description:
      "A cozy knit sweater in a soft pastel shade, perfect for cooler days.",
    rating: 4.3,
    reviews: [
      {
        id: 4,
        user: "Jessica",
        rating: 4,
        comment: "Very comfortable and soft. Runs a bit large.",
        date: "2023-09-18",
      },
    ],
  },
  {
    id: 4,
    name: "Ceramic Mug Set",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=3180&auto=format&fit=crop",
    category: "Home",
    description: "A set of four ceramic mugs in assorted pastel colors.",
    rating: 4.7,
    reviews: [
      {
        id: 5,
        user: "David",
        rating: 5,
        comment: "These mugs are beautiful and well-made. Great size too!",
        date: "2023-10-10",
      },
    ],
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=3180&auto=format&fit=crop",
    category: "Electronics",
    description:
      "Sleek wireless earbuds with excellent sound quality and pastel case options.",
    rating: 4.6,
    reviews: [
      {
        id: 6,
        user: "Alex",
        rating: 5,
        comment: "Sound quality is amazing and the pastel case is so cute!",
        date: "2023-09-30",
      },
    ],
  },
  {
    id: 6,
    name: "Linen Throw Pillow",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=3087&auto=format&fit=crop",
    category: "Home",
    description:
      "A soft linen throw pillow in a gentle pastel hue to accent your home.",
    rating: 4.4,
    reviews: [
      {
        id: 7,
        user: "Olivia",
        rating: 4,
        comment: "Beautiful color and nice fabric. Wish it was a bit larger.",
        date: "2023-10-02",
      },
    ],
  },
  {
    id: 7,
    name: "Pastel Sneakers",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=3087&auto=format&fit=crop",
    category: "Footwear",
    description:
      "Comfortable sneakers in soft pastel colors for a stylish casual look.",
    rating: 4.9,
    reviews: [
      {
        id: 8,
        user: "Ryan",
        rating: 5,
        comment: "Most comfortable shoes I've ever owned and they look great!",
        date: "2023-10-12",
      },
    ],
  },
  {
    id: 8,
    name: "Notebook Set",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=3087&auto=format&fit=crop",
    category: "Stationery",
    description:
      "A set of three notebooks with pastel covers and high-quality paper.",
    rating: 4.2,
    reviews: [
      {
        id: 9,
        user: "Emma",
        rating: 4,
        comment: "Love the colors and the paper quality is excellent.",
        date: "2023-09-25",
      },
    ],
  },
];

const categories = [
  "All",
  "Accessories",
  "Clothing",
  "Home",
  "Electronics",
  "Footwear",
  "Stationery",
];

const MovingIcon = ({
  icon: Icon,
  className = "",
  animationType = "float",
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  animationType?: "float" | "bounce" | "pulse" | "rotate" | "wiggle";
  delay?: number;
}) => {
  const animations = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
    bounce: {
      y: [0, -12, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay,
      },
    },
    wiggle: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      animate={animations[animationType]}
      className={`inline-block ${className}`}
    >
      <Icon className="w-5 h-5" />
    </motion.div>
  );
};

export default function EcommerceApp() {
  const cart = useCart();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("products");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const recommendedProducts = useMemo(() => {
    return products
      .filter(
        (product) => !cart.items.some((item) => item.product.id === product.id)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [cart.items]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isInWishlist) {
        toast.success(`${product.name} removed from wishlist`);
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        toast.success(`${product.name} added to wishlist`);
        return [...prevWishlist, product];
      }
    });
  }, []);

  const isInWishlist = (productId: number) => {
    return wishlist.some((product) => product.id === productId);
  };

  const MobileProductCard = ({
    product,
    compact = false,
  }: {
    product: Product;
    compact?: boolean;
  }) => (
    <motion.div
      className="h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="relative">
        <div
          className={`w-full ${
            compact ? "h-32" : "h-40"
          } relative overflow-hidden`}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full h-8 w-8 min-h-[32px] min-w-[32px] shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleWishlist(product);
            }}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </motion.div>
      </div>
      <div
        className={`p-3 ${compact ? "pb-2" : "pb-3"} flex-grow flex flex-col`}
      >
        <h3
          className={`font-medium ${
            compact ? "text-xs line-clamp-1" : "text-sm line-clamp-1"
          }`}
        >
          {product.name}
        </h3>

        {!compact && (
          <div className="flex items-center mt-1.5 mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews.length})
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className={`font-semibold ${compact ? "text-xs" : "text-sm"}`}>
            ${product.price.toFixed(2)}
          </span>
          {!compact && (
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size="sm"
                className="h-8 px-3 text-xs bg-pink-500 hover:bg-pink-600 min-h-[32px]"
                onClick={(e) => {
                  e.stopPropagation();
                  cart.addItem(product);
                }}
              >
                Add
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const ProductCard = ({ product }: { product: Product }) => {
    const cartItem = cart.items.find((item) => item.product.id === product.id);

    return (
      <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md group">
        <div className="relative">
          <div className="w-full h-48 relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleWishlist(product);
            }}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Badge
            variant="outline"
            className="absolute top-2 left-2 bg-white/90 text-pink-700 border-pink-200"
          >
            {product.category}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base font-medium line-clamp-1">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews.length})
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {product.description}
          </p>
        </CardContent>
        <div className="p-4 pt-0 flex justify-between items-center">
          <span className="font-semibold text-lg">
            ${product.price.toFixed(2)}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  cart.updateQuantity(product.id, cartItem.quantity - 1);
                }}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{cartItem.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  cart.updateQuantity(product.id, cartItem.quantity + 1);
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="bg-pink-500 hover:bg-pink-600 transition-transform duration-300 transform group-hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!cartItem) {
                  cart.addItem(product);
                }
              }}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card>
    );
  };

  const CartSheet = () => (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg sm:max-w-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <SheetHeader>
              <SheetTitle>Your Cart ({cart.itemCount} items)</SheetTitle>
            </SheetHeader>

            {!cart.isEmpty ? (
              <div className="flex flex-col h-[calc(100%-4rem)]">
                <div className="flex-grow overflow-auto py-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center py-3 border-b"
                    >
                      <div className="w-[60px] h-[60px] relative">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            cart.updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            cart.updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-auto sticky bottom-0 bg-white">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => {
                      setIsCartOpen(false);
                      setActiveTab("checkout");
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[80%] text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven&apos;t added any products to your cart yet.
                </p>
                <Button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("products");
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  const MobileMenu = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("products");
                setIsMenuOpen(false);
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              Products
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("wishlist");
                setIsMenuOpen(false);
              }}
            >
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const cartItem = cart.items.find(
    (item) => item.product.id === selectedProduct?.id
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GoogleFontImport />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            margin: "0 auto",
            maxWidth: "100%",
          },
        }}
      />

      <header className="sticky top-0 z-40 bg-white shadow-sm px-4 py-3 md:hidden animate-fadeIn">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 -ml-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <MovingIcon
                icon={Palette}
                className="text-pink-500"
                animationType="wiggle"
              />
              <h1 className="text-xl font-bold text-pink-600">
                Pastel<span className="text-gray-800">Shop</span>
              </h1>
              <MovingIcon
                icon={Sparkles}
                className="text-purple-500"
                animationType="pulse"
                delay={0.5}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("wishlist");
              }}
            >
              <Heart
                className={`h-5 w-5 ${
                  activeTab === "wishlist" ? "fill-pink-200 text-pink-500" : ""
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-10 pr-10 bg-gray-100 border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <header className="hidden md:block sticky top-0 z-40 bg-white shadow-sm animate-fadeIn">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center gap-3">
                <MovingIcon
                  icon={Palette}
                  className="text-pink-500"
                  animationType="float"
                />
                <MovingIcon
                  icon={Brush}
                  className="text-purple-500"
                  animationType="wiggle"
                  delay={0.3}
                />
                <h1 className="text-2xl font-bold text-pink-600">
                  Pastel<span className="text-gray-800">Shop</span>
                </h1>
                <MovingIcon
                  icon={Sparkles}
                  className="text-yellow-500"
                  animationType="pulse"
                  delay={0.6}
                />
                <MovingIcon
                  icon={Star}
                  className="text-pink-400"
                  animationType="rotate"
                  delay={0.9}
                />
              </div>
              <nav className="hidden md:flex space-x-4">
                <Button
                  variant="ghost"
                  className={activeTab === "products" ? "text-pink-600" : ""}
                  onClick={() => setActiveTab("products")}
                >
                  Products
                </Button>
                <Button
                  variant="ghost"
                  className={activeTab === "wishlist" ? "text-pink-600" : ""}
                  onClick={() => setActiveTab("wishlist")}
                >
                  Wishlist
                </Button>
                <div className="relative group pb-2">
                  <Button variant="ghost">Categories</Button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedCategory === category
                            ? "bg-pink-50 text-pink-700"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setActiveTab("products");
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart
                  className={`h-5 w-5 ${
                    activeTab === "wishlist"
                      ? "fill-pink-200 text-pink-500"
                      : ""
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </Button>

              <Button
                className="hidden md:inline-flex bg-pink-500 hover:bg-pink-600"
                onClick={() => {
                  if (!cart.isEmpty) {
                    setActiveTab("checkout");
                  } else {
                    setIsCartOpen(true);
                  }
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-auto pb-16 md:pb-0">
        {activeTab === "products" &&
          selectedCategory === "All" &&
          !searchQuery && (
            <motion.section
              className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12 md:py-20 animate-fadeIn"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
              </div>

              <div className="container mx-auto relative">
                <div className="md:flex items-center gap-12">
                  <div className="relative z-10 md:w-1/2 mb-12 md:mb-0">
                    <div className="max-w-xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4"
                      >
                        <MovingIcon
                          icon={Sparkles}
                          className="text-pink-500 w-4 h-4 md:w-5 md:h-5"
                          animationType="pulse"
                        />
                        <MovingIcon
                          icon={Palette}
                          className="text-purple-500 w-4 h-4 md:w-5 md:h-5"
                          animationType="float"
                          delay={0.3}
                        />
                        <MovingIcon
                          icon={Star}
                          className="text-yellow-500 w-4 h-4 md:w-5 md:h-5"
                          animationType="rotate"
                          delay={0.6}
                        />
                      </motion.div>

                      <motion.h1
                        className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          Discover Our{" "}
                        </motion.span>
                        <motion.span
                          className="text-pink-500 relative inline-block"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.8,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <motion.span
                            animate={{
                              backgroundPosition: [
                                "0% 50%",
                                "100% 50%",
                                "0% 50%",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{
                              background:
                                "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)",
                              backgroundSize: "200% 100%",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            Pastel
                          </motion.span>
                          <motion.span
                            className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                          />
                          <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                          </motion.div>
                        </motion.span>{" "}
                        <motion.span
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                        >
                          Collection
                        </motion.span>
                      </motion.h1>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="flex items-center gap-2 mb-6"
                      >
                        <MovingIcon
                          icon={Heart}
                          className="text-red-500"
                          animationType="pulse"
                        />
                        <MovingIcon
                          icon={Gift}
                          className="text-pink-500"
                          animationType="bounce"
                          delay={0.2}
                        />
                        <MovingIcon
                          icon={Crown}
                          className="text-purple-500"
                          animationType="wiggle"
                          delay={0.4}
                        />
                      </motion.div>

                      <motion.p
                        className="text-gray-600 text-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6 }}
                      >
                        Explore our curated selection of beautiful
                        pastel-colored products that bring joy to everyday life.
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Button
                            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full text-base px-8 py-3 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all duration-300 relative overflow-hidden"
                            onClick={() => {
                              const categoriesSection =
                                document.getElementById("categories-section");
                              if (categoriesSection) {
                                const headerOffset = 80;
                                const elementPosition =
                                  categoriesSection.getBoundingClientRect().top;
                                const offsetPosition =
                                  elementPosition +
                                  window.pageYOffset -
                                  headerOffset;

                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: "smooth",
                                });
                              }
                            }}
                          >
                            <motion.span
                              className="relative z-10 flex items-center gap-2"
                              animate={{ x: [0, 2, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              Shop Now
                              <MovingIcon
                                icon={ShoppingBag}
                                className="text-white"
                                animationType="bounce"
                                delay={0.5}
                              />
                            </motion.span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Button
                            variant="outline"
                            className="border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-full text-base px-8 py-3 transition-all duration-300 relative overflow-hidden"
                            onClick={() => setActiveTab("wishlist")}
                          >
                            <motion.span
                              className="flex items-center gap-2"
                              animate={{ x: [0, -2, 0] }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <MovingIcon
                                icon={Heart}
                                className="text-pink-500"
                                animationType="pulse"
                              />
                              Wishlist
                            </motion.span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2">
                    <div className="relative">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-8">
                          <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative">
                              <img
                                src={products[0].image || "/placeholder.svg"}
                                alt={products[0].name}
                                className="rounded-lg shadow-lg transform translate-y-8 transition-all duration-300 group-hover:translate-y-4 group-hover:scale-[1.02] w-[280px] h-[280px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                          </motion.div>
                          <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative">
                              <img
                                src={products[1].image || "/placeholder.svg"}
                                alt={products[1].name}
                                className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02] w-[280px] h-[280px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                          </motion.div>
                        </div>
                        <div className="space-y-8 mt-16">
                          <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative">
                              <img
                                src={products[2].image || "/placeholder.svg"}
                                alt={products[2].name}
                                className="rounded-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02] w-[280px] h-[280px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                          </motion.div>
                          <motion.div
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                            <div className="relative">
                              <img
                                src={products[3].image || "/placeholder.svg"}
                                alt={products[3].name}
                                className="rounded-lg shadow-lg transform translate-y-8 transition-all duration-300 group-hover:translate-y-4 group-hover:scale-[1.02] w-[280px] h-[280px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

        {activeTab === "products" && !searchQuery && (
          <motion.div
            className="py-4 px-4 bg-white md:container md:mx-auto md:mt-8 animate-fadeIn"
            id="categories-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar flex-wrap md:flex-wrap sm:flex-wrap">
              <Button
                key="all"
                variant={selectedCategory === "All" ? "default" : "outline"}
                className={`rounded-full whitespace-nowrap ${
                  selectedCategory === "All" ? "bg-pink-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              {categories
                .filter((category) => category !== "All")
                .map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    className={`rounded-full whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-pink-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
            </div>
          </motion.div>
        )}

        <div className="px-4 py-4 md:container md:mx-auto">
          {activeTab === "products" && selectedCategory !== "All" && (
            <motion.div
              className="mb-4 animate-fadeIn"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {selectedCategory === "Accessories" && (
                      <>
                        <MovingIcon
                          icon={Crown}
                          className="text-pink-500"
                          animationType="float"
                        />
                        <MovingIcon
                          icon={Sparkles}
                          className="text-purple-500"
                          animationType="pulse"
                          delay={0.5}
                        />
                      </>
                    )}
                    {selectedCategory === "Clothing" && (
                      <>
                        <MovingIcon
                          icon={Package}
                          className="text-pink-500"
                          animationType="bounce"
                        />
                        <MovingIcon
                          icon={Star}
                          className="text-yellow-500"
                          animationType="rotate"
                          delay={0.3}
                        />
                      </>
                    )}
                    {selectedCategory === "Home" && (
                      <>
                        <MovingIcon
                          icon={Home}
                          className="text-pink-500"
                          animationType="wiggle"
                        />
                        <MovingIcon
                          icon={Heart}
                          className="text-red-500"
                          animationType="pulse"
                          delay={0.7}
                        />
                      </>
                    )}
                    {selectedCategory === "Electronics" && (
                      <>
                        <MovingIcon
                          icon={Zap}
                          className="text-blue-500"
                          animationType="pulse"
                        />
                        <MovingIcon
                          icon={Sparkles}
                          className="text-pink-500"
                          animationType="float"
                          delay={0.4}
                        />
                      </>
                    )}
                    {selectedCategory === "Footwear" && (
                      <>
                        <MovingIcon
                          icon={Star}
                          className="text-pink-500"
                          animationType="bounce"
                        />
                        <MovingIcon
                          icon={Flame}
                          className="text-orange-500"
                          animationType="wiggle"
                          delay={0.6}
                        />
                      </>
                    )}
                    {selectedCategory === "Stationery" && (
                      <>
                        <MovingIcon
                          icon={Sparkles}
                          className="text-purple-500"
                          animationType="rotate"
                        />
                        <MovingIcon
                          icon={Star}
                          className="text-pink-500"
                          animationType="float"
                          delay={0.2}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCategory}</h2>
                    <p className="text-gray-500 text-sm">
                      {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div
              className="space-y-6 animate-slideUp"
              id="products-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 gap-3 product-grid md:hidden">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="transform transition-all duration-200"
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <MobileProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 font-heading">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {recommendedProducts.length > 0 &&
                selectedCategory === "All" &&
                !searchQuery && (
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <MovingIcon
                        icon={Gift}
                        className="text-pink-500"
                        animationType="bounce"
                      />
                      <MovingIcon
                        icon={Sparkles}
                        className="text-purple-500"
                        animationType="pulse"
                        delay={0.3}
                      />
                      <h2 className="text-lg font-semibold font-heading">
                        Recommended for You
                      </h2>
                      <MovingIcon
                        icon={Star}
                        className="text-yellow-500"
                        animationType="rotate"
                        delay={0.6}
                      />
                      <MovingIcon
                        icon={Heart}
                        className="text-red-500"
                        animationType="float"
                        delay={0.9}
                      />
                    </div>

                    <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar md:hidden">
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="min-w-[160px] max-w-[160px]"
                        >
                          <MobileProductCard product={product} compact />
                        </div>
                      ))}
                    </div>

                    <div className="hidden md:grid md:grid-cols-4 gap-6">
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="cursor-pointer"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div 
              className="animate-fadeIn"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {wishlist.length > 0 ? (
                <div>
                  <motion.div 
                    className="flex items-center justify-between mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <MovingIcon
                        icon={Heart}
                        className="text-red-500"
                        animationType="pulse"
                      />
                      <MovingIcon
                        icon={Sparkles}
                        className="text-pink-500"
                        animationType="float"
                        delay={0.4}
                      />
                      <h2 className="text-xl font-bold">Your Wishlist</h2>
                      <MovingIcon
                        icon={Star}
                        className="text-yellow-500"
                        animationType="wiggle"
                        delay={0.7}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setWishlist([])}
                      className="text-sm"
                    >
                      Clear All
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 md:hidden">
                    {wishlist.map((product, index) => (
                      <motion.div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="transform transition-all duration-300 active:scale-95"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.3 + index * 0.1, 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <MobileProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((product, index) => (
                      <motion.div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.3 + index * 0.1, 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="text-center py-12 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
                  >
                    <Heart className="h-8 w-8 text-pink-300" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-medium mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    Your wishlist is empty
                  </motion.h3>
                  <motion.p 
                    className="text-gray-500 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    Save items you love to your wishlist
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <Button onClick={() => setActiveTab("products")}>
                      Browse Products
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "checkout" && (
            <motion.div 
              className="animate-fadeIn"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              >
                <CheckoutForm cart={cart} setActiveTab={setActiveTab} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="hidden md:block bg-white border-t mt-12 py-8 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PastelShop</h3>
              <p className="text-gray-600 mb-4">
                Your destination for beautiful pastel-colored products that
                bring joy to everyday life.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className="text-gray-600 hover:text-pink-500"
                      onClick={() => {
                        setSelectedCategory(category);
                        setActiveTab("products");
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className="text-gray-600 hover:text-pink-500"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    Wishlist
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-600 hover:text-pink-500"
                    onClick={() => setIsCartOpen(true)}
                  >
                    Cart
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-600 hover:text-pink-500"
                    onClick={() => {
                      if (!cart.isEmpty) {
                        setActiveTab("checkout");
                      } else {
                        setIsCartOpen(true);
                      }
                    }}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-600 mb-2">Email: info@pastelshop.com</p>
              <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-600">
                Address: 123 Pastel Lane, Colorful City
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} PastelShop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 px-2 py-2 md:hidden animate-slideUp mobile-safe-area">
        <div className="flex justify-around">
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-14 w-16 rounded-lg min-h-[56px] ${
                activeTab === "products" ? "text-pink-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("products")}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-14 w-16 rounded-lg min-h-[56px] ${
                activeTab === "wishlist" ? "text-pink-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart
                className={`h-5 w-5 ${
                  activeTab === "wishlist" ? "fill-pink-200" : ""
                }`}
              />
              <span className="text-xs mt-1">Wishlist</span>
            </Button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center h-14 w-16 rounded-lg min-h-[56px] ${
                activeTab === "checkout" ? "text-pink-600" : "text-gray-500"
              }`}
              onClick={() =>
                !cart.isEmpty ? setActiveTab("checkout") : setIsCartOpen(true)
              }
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs mt-1">Checkout</span>
            </Button>
          </motion.div>
        </div>
      </nav>

      <MobileMenu />

      <CartSheet />

      {selectedProduct && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={() => setSelectedProduct(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-t-xl md:rounded-xl w-full max-h-[90vh] overflow-auto md:max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="sticky top-0 z-10 bg-white flex justify-end p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 pt-0">
                <motion.div
                  className="w-full h-64 md:h-80 relative mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold font-heading">
                      {selectedProduct.name}
                    </h2>
                    <Badge className="bg-pink-50 text-pink-700 border-pink-200">
                      {selectedProduct.category}
                    </Badge>
                  </div>

                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({selectedProduct.reviews.length} reviews)
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">
                    {selectedProduct.description}
                  </p>

                  <div className="text-2xl font-bold mb-4 font-heading">
                    ${selectedProduct.price.toFixed(2)}
                  </div>

                  <div className="flex gap-3 mb-6">
                    {cartItem ? (
                      <div className="flex-1 flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            cart.updateQuantity(
                              selectedProduct.id,
                              cartItem.quantity - 1
                            );
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="flex-1 text-center">
                          {cartItem.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            cart.updateQuantity(
                              selectedProduct.id,
                              cartItem.quantity + 1
                            );
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="flex-1 bg-pink-500 hover:bg-pink-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          cart.addItem(selectedProduct);
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(selectedProduct);
                      }}
                    >
                      {isInWishlist(selectedProduct.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 font-heading">
                      Customer Reviews
                    </h3>
                    {selectedProduct.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {selectedProduct.reviews.map((review) => (
                          <motion.div
                            key={review.id}
                            className="border-b pb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * review.id }}
                          >
                            <div className="flex justify-between">
                              <div className="font-medium">{review.user}</div>
                              <div className="text-sm text-gray-500">
                                {review.date}
                              </div>
                            </div>
                            <div className="flex items-center my-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 text-sm">
                              {review.comment}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

       
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }

          button,
          .interactive {
            min-height: 44px;
            min-width: 44px;
          }

        
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        }

  
        input:focus,
        textarea:focus {
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
          border-color: rgba(236, 72, 153, 0.5);
          outline: none;
        }

       
        .shadow-soft {
          box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
            0 10px 20px -2px rgba(0, 0, 0, 0.04);
        }

        .shadow-medium {
          box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .shadow-strong {
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15),
            0 2px 10px -2px rgba(0, 0, 0, 0.05);
        }

    
        button,
        a,
        .interactive {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

      
        @media (hover: hover) {
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15);
          }
        }

       
        @media (max-width: 768px) {
          .product-grid {
            gap: 0.75rem;
          }

          .mobile-safe-area {
            padding-bottom: env(safe-area-inset-bottom);
          }

        
          .animate-blob {
            animation-duration: 8s;
          }

         
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

       
        .overflow-auto {
          -webkit-overflow-scrolling: touch;
        }

      
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #ec4899;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}