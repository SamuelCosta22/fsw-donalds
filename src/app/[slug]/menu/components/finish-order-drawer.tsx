"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf } from "@/utils/validate-cpf";

import { createOrder } from "../actions/create-order";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { CartContext } from "../contexts/cart";

interface FinishOrderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderDrawer = ({ open, onOpenChange }: FinishOrderDrawerProps) => {
  const { slug } = useParams<{ slug: string }>();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const searchParams = useSearchParams();
  const { products } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      const order = await createOrder({
        consumptionMethod: consumptionMethod,
        customerName: data.name,
        customerCpf: data.cpf,
        products: products,
        slug: slug,
      });
      // onOpenChange(false);
      // toast.success("Pedido finalizado com sucesso!")
      const { sessionId } = await createStripeCheckout({
        products,
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf,
      });
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Seu nome</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm placeholder:text-xs"
                        placeholder="Digite seu nome..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        className="text-sm placeholder:text-xs"
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="p-0">
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDrawer;
