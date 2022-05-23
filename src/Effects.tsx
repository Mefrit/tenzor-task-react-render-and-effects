import { subscribe, unsubscribe } from './resources/API';
import { useEffect, useState } from 'react';
let callBacks: any = new Map();

export function Effects(props: { sourceId: string }) {
    const [message, setMessage] = useState('-1');
    const [sourceId, setSourceId] = useState('');

    function unsubscribeByKey(key: string) {
        unsubscribe(key, callBacks.get(key));
        callBacks.delete(key);
    }
    function subscribeByKey(key: string, callBack: (message: number) => void) {
        callBacks.delete(key);
        callBacks.set(key, callBack);
        subscribe(key, callBacks.get(key));
    }
    useEffect(() => {
        if (props.sourceId === sourceId) {
            return;
        }
        const callBack = (message: number) => {
            setMessage(message.toString());
        };
        if (sourceId === '') {
            setSourceId(props.sourceId);
            if (callBacks.get(props.sourceId)) {
                unsubscribeByKey(props.sourceId);
            }
            subscribeByKey(props.sourceId, callBack);
        } else {
            if (callBacks.get(sourceId)) {
                unsubscribeByKey(sourceId);
            }
            if (callBacks.get(props.sourceId)) {
                unsubscribeByKey(props.sourceId);
            }
            subscribeByKey(props.sourceId, callBack);

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
