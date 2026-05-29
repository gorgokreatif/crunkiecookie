import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) return null;

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminUsername || !adminPasswordHash) return null;
        if (username !== adminUsername) return null;

        const valid = await bcrypt.compare(password, adminPasswordHash);
        if (!valid) return null;

        return { id: 'admin', name: 'Admin', email: 'admin@crunkie.de' };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt' },
});
