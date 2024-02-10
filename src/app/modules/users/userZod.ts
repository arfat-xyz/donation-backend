import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email must be an email'),
    password: z.string({
      required_error: 'Password is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});
const updateUser = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email must be an email')
      .optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    image: z
      .string({
        required_error: 'Image is required',
      })
      .optional(),
    role: z
      .string({
        required_error: 'Role is required',
      })
      .optional(),
  }),
});
const loginUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email must be an email'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const UserZodSchema = { createUser, loginUser, updateUser };
