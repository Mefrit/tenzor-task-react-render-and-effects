import { subscribe, unsubscribe } from './resources/API';
import React from 'react';
import { useEffect, useState } from 'react';
let callBacks: any = [];

export function Effects(props: { sourceId: string }) {
    // let callBacks: any = []
    // const [callBacks, setCallBacks] = useState([])
    // const tabIdOne = React.unstable_useOpaqueIdentifier();
    const [message, setMessage] = useState('-1');
    const [sourceId, setSourceId] = useState('');
    const callBack = (message: number) => {
        setMessage(message.toString());
    };
    useEffect(() => {
        console.log('HGERE', props.sourceId);
        if (callBacks[props.sourceId]) {
            unsubscribe(props.sourceId, callBacks[props.sourceId]);
            callBacks = callBacks.filter(
                (elem: any, key: any, arr: any) => key !== props.sourceId,
            );
            // callBacks[props.sourceId] = undefined
        }
        // callBacks = [];
    }, []);
    useEffect(() => {
        // if (props.sourceId === sourceId) {

        //     return
        // }

        // if (callBacks[sourceId]) {
        //     unsubscribe(sourceId, newCallBack[sourceId])
        // }
        console.log(
            '\n\n useEffect ==> ',
            sourceId,
            ' +>> ',
            props.sourceId,
            callBacks,
        );
        if (sourceId === '') {
            setSourceId(props.sourceId);
            if (callBacks[props.sourceId]) {
                console.log('unsubscribe 2 ', props.sourceId, callBacks);
                unsubscribe(props.sourceId, callBacks[props.sourceId]);
                callBacks = callBacks.filter(
                    (elem: any, key: any, arr: any) => key !== props.sourceId,
                );
            }

            // setCallBacks(newCallBack)
            console.log(
                '\n -----subscribe 0000',
                sourceId,
                ' props ',
                props.sourceId,
                callBacks,
            );
            callBacks[props.sourceId] = callBack;
            subscribe(props.sourceId, callBacks[props.sourceId]);
        } else {
            // console.log("unsubscribe", sourceId, props.sourceId, callBacks[sourceId], callBacks)
            // if (callBacks[sourceId]) {
            //     console.log("unsubscribe", sourceId, callBacks)
            //     unsubscribe(sourceId, callBacks[sourceId])
            //     callBacks = callBacks.filter((elem: any, key: any, arr: any) => key !== sourceId)
            // }
            if (callBacks[props.sourceId]) {
                console.log('unsubscribe 2 ', props.sourceId, callBacks);
                unsubscribe(props.sourceId, callBacks[props.sourceId]);

                callBacks = callBacks.filter(
                    (elem: any, key: any, arr: any) => key !== props.sourceId,
                );
            }
            // setCallBacks(newCallBack)

            // unsubscribe(props.sourceId, newCallBack[sourceId])
            console.log('subscribe1111', sourceId, props.sourceId, callBacks);
            callBacks[props.sourceId] = callBack;
            subscribe(props.sourceId, callBacks[props.sourceId]);
            setSourceId(props.sourceId);
        }
        setMessage('-1');
    }, [props.sourceId]);

    return (
        <div>
            {props.sourceId}: {message}
        </div>
    );
}
