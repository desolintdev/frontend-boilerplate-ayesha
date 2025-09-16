import {UsersPageProps} from '@/shared/interfaces/dashboard';

export default async function UserPage({params}: UsersPageProps) {
  const {id} = await params;

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Create User'}</h1>
      <form>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <button type='submit'>{id ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
}
