interface Item {
  id: number;
  name: string;
  sku: string;
}

interface ParentItem {
  id: number;
  name: string;
  items: Item[];
}

async function getData(): Promise<ParentItem[]> {
  const res = await fetch('http://localhost:3100/api/parent-items', {cache: 'no-cache'});
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Index() {
  const data = await getData()

  return (
    <>
      <h1 className="text-3xl">Parent Items</h1>
      <div className="flex">
        <div>
        {data.map((parentItem: ParentItem) => (
          <div key={parentItem.id}>
            <div
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{parentItem.name}</div>
            <div className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              <div className="flex flex-row">
                {parentItem.items.map((item: Item) => (
                  <div className="" key={item.id}>{item.name} ({item.sku})</div>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
        <tr>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Parent Item
          </th>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Items
          </th>
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
        {data.map((parentItem: ParentItem) => (
          <tr key={parentItem.id}>
            <td
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{parentItem.name}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              <ul>
                {parentItem.items.map((item: Item) => (
                  <li key={item.id}>{item.name} ({item.sku})</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}
