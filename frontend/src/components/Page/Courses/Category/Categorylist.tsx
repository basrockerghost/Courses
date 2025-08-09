import React, { useEffect } from 'react'
import Cadropmenu from './Cadropmenu'
import { useCatContext } from '../../../api/CatProvider';

const Categorylist:React.FC<{searchText: string}> = ({searchText}) => {

    const { categories } = useCatContext();

    const filterCategories = (searchText: string) => {
        if (!searchText) return categories;
        return categories.filter(categories => (
            categories.catnameTH.toLowerCase().includes(searchText.toLowerCase()) ||
            categories.catnameEN.toLowerCase().includes(searchText.toLowerCase())
        ))
    }

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
                    {filterCategories.length > 0 ? (
                        filterCategories(searchText).map(category => (
                            <tr key={category._id}>
                                <td>{category.catnameTH}</td>
                                <td>{category.catnameEN}</td>
                                <td>
                                    <Cadropmenu catId={category._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">ไม่พบข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Categorylist

