import { z } from "zod";

export const propertySchema = z.object({
  formattedAddress: z.string().min(5),
  lat: z.number(),
  lng: z.number(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional()
});

export const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email(),
  notes: z.string().optional(),
  property: propertySchema,
  measurement: z.object({
    polygons: z.array(z.array(z.object({ lat: z.number(), lng: z.number() }))),
    squareFeet: z.number().min(1),
    customerConfirmed: z.boolean()
  })
});

export const estimateSchema = z.object({
  estimate: z.object({
    low: z.number(),
    high: z.number(),
    assumptions: z.array(z.string()),
    selectedOptions: z.object({
      productTier: z.enum(["value", "premium", "pet"]),
      addOns: z.array(z.string())
    })
  })
});
