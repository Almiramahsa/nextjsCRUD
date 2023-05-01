'use client';
import { Dialog, Transition } from '@headlessui/react';
import { SyntheticEvent, Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RequestCookiesAdapter } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
export default function AddProduct() {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });
    setTitle('');
    setPrice('');
    router.refresh();
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed top-4 left-10 rounded-md bg-violet-500  px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Add Product
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    Add New Product{' '}
                  </Dialog.Title>
                  <div className="mt-2">
                    <h2 className="text-md mb-4 text-gray-500">Are you sure want to add this product?</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control">
                      <label className="label font-bold">Title </label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered text-sm" placeholder="product name"></input>
                    </div>
                    <div className="form-control">
                      <label className="label font-bold">Price </label>
                      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input text-sm w-full input-bordered" placeholder="price"></input>
                    </div>
                  </form>
                  <div className="mt-4 ">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 ml-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
