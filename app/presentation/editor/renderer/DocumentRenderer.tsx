import { useDocument }
from "~/adapters/react/hooks/document/useDocument";

import { ContentRenderer }
from "./content/ContentRenderer";

export function DocumentRenderer(){

    const document =
        useDocument();

    return(

        <>

            {

                document.children.map(

                    (

                        node,

                        index

                    )=>(

                        <ContentRenderer

                            key={node.id ?? index}

                            node={node}

                        />

                    )

                )

            }

        </>

    );

}


// import { useDocument }
// from "~/adapters/react/hooks/document/useDocument";

// import { ContentRenderer }
// from "./content/ContentRenderer";

// export function DocumentRenderer(){

//     const document =
//         useDocument();

//     return(

//         <>

//             {

//                 document.children.map(

//                     (node)=>(

//                         <ContentRenderer

//                             key={node.id}

//                             node={node}

//                         />

//                     )

//                 )

//             }

//         </>

//     );

// }

// // import { useEditor } from "../hooks/useEditor";
// // import { QuestionRenderer } from "./QuestionRenderer";

// // export function DocumentRenderer()
// // {
// //     const editor =
// //         useEditor();

// //     const questions =
// //         editor
// //             .state
// //             .document
// //             .questions;

// //     return (

// //         <div>

// //             {

// //                 questions.map(

// //                     (
// //                         question,
// //                         index
// //                     ) => (

// //                         <QuestionRenderer

// //                             key={question.id}

// //                             question={
// //                                 question
// //                             }

// //                             index={
// //                                 index
// //                             }

// //                         />

// //                     )

// //                 )

// //             }

// //         </div>

// //     );

// // }