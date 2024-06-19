import { Unit } from "./unit";

let uniqueUnitId = 0;

const getNextUnitId = () => ++uniqueUnitId;

const populateData = () => {
    if(!localStorage.getItem("unit-id-collection"))
    {
        // create new storage
        localStorage.clear();
        localStorage.setItem("unit-id-collection", "");

        return [];

    } else {
        let unitSplit = localStorage.getItem("unit-id-collection").split(",");

        const unitArray = [];

        for (const id of unitSplit)
        {
            if(id !== '' && id.length > 0)
            {
                let unitId = +id;
                unitArray.push(new Unit(unitId, localStorage.getItem(`unit-${unitId}-content`)));

                if(unitId > uniqueUnitId)
                {
                    uniqueUnitId = unitId;
                }
            }
        }

        return unitArray;
    }
}

const appendUnit = (unit) =>
{
    if(!localStorage.getItem("unit-id-collection").includes(unit._id + ","))
    {
        localStorage.setItem("unit-id-collection", (localStorage.getItem("unit-id-collection") + unit._id + ","));
        localStorage.setItem(`unit-${unit._id}-content`, unit.content);
    }
}

const updateUnit = (unit) =>
{
    if(localStorage.getItem("unit-id-collection").includes(unit._id + ","))
    {
        localStorage.setItem(`unit-${unit._id}-content`, unit.content);
    }
}

const deleteUnit = (unit) =>
{
    if(localStorage.getItem("unit-id-collection").includes(unit._id + ","))
    {
        let newCollection = localStorage.getItem("unit-id-collection").replace((unit._id + ','), '');
        localStorage.setItem("unit-id-collection", newCollection);
        localStorage.removeItem(`unit-${unit._id}-content`);
    }
}

export { getNextUnitId, populateData, appendUnit, updateUnit, deleteUnit }