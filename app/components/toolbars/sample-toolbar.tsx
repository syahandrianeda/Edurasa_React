import { TtdCollectionTrigger } from "./kop-ttd/kop-ttd";


export const SampleDefaultUsingConfig = {
    tabList:[
        {
            value: 'tab1',
            label: 'Tab 1'
        },
        {
            value: 'tab2',
            label: 'Tab 2'
        },
    ],
    contentList:[
        {
            value: 'tab1',
            element: 'HeloElement'
        },
        {
            value: 'tab2',
            element: <TtdCollectionTrigger/>
        },
    ]

};
