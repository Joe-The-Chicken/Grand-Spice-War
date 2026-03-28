import { setSelectedBuild } from "./input.js";
import { assetData, assets } from "./assets.js";

const uiData = {
    1 : [
        [
            {
                image: () => {return assets.build.house1_0;},
                action: () => setSelectedBuild("house1"),
                data: () => {return assetData.build.house1;},
            },
            {
                image: () => {return assets.build.house2_0;},
                action: () => setSelectedBuild("house2"),
                data: () => {return assetData.build.house2;},
            },
            {
                image: () => {return assets.build.house3_0;},
                action: () => setSelectedBuild("house3"),
                data: () => {return assetData.build.house3;},
            },
        ],
        [
            {
                image: () => {return assets.build.house4_0;},
                action: () => setSelectedBuild("house4"),
                data: () => {return assetData.build.house4;},
            },
            {
                image: () => {return assets.build.house5_0;},
                action: () => setSelectedBuild("house5"),
                data: () => {return assetData.build.house5;},
            },
            {
                image: () => {return assets.build.house6_0;},
                action: () => setSelectedBuild("house6"),
                data: () => {return assetData.build.house6;},
            },
        ],
    ],
    2 : [
        [
            {
                image: () => {return assets.build.dock1_0;},
                action: () => setSelectedBuild("dock1"),
                data: () => {return assetData.build.dock1;},
            }
        ],
        [
            {
                image: () => {return assets.build.lighthouse1_0;},
                action: () => setSelectedBuild("lighthouse1"),
                data: () => {return assetData.build.lighthouse1;},
            }
        ],
        [
            {
                image: () => {return assets.build.security1;},
                action: () => setSelectedBuild("security1"),
                data: () => {return assetData.build.security1;},
            },
            {
                image: () => {return assets.build.security2;},
                action: () => setSelectedBuild("security2"),
                data: () => {return assetData.build.security2;},
            },
        ],
    ],
    3 : [
        
    ],
    4 : [

    ],
    5 : [

    ],
    6 : [

    ]
};

export default uiData;