import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { updateBox } from '../../actions'
import BoxForm from '../BoxForm'

export default async function EditBoxPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/merchant/login')

  const { data: box } = await supabase
    .from('boxes')
    .select('*')
    .eq('id', id)
    .eq('merchant_id', user.id)
    .single()

  if (!box) notFound()

  return (
    <>
      <div className="merchant-page-header">
        <div>
          <h1>Edit box</h1>
          <p>Update your listing. Changes take effect immediately.</p>
        </div>
      </div>
      <BoxForm action={updateBox} box={box} userId={user.id} />
    </>
  )
}
