import React, { useEffect } from 'react'
import Cadropmenu from './Cadropmenu'
import { useCatContext } from '../../../api/CatProvider';

const Categorylist:React.FC = () => {

    const { categories } = useCatContext();

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>หมวดหมู่วิชา (th)</th>
                        <th>หมวดหมู่วิชา (en)</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.catnameTH}</td>
                            <td>{category.catnameEN}</td>
                            <td className='relative w-52'>
                                <Cadropmenu catId={category._id} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>
                            No category found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Categorylist

