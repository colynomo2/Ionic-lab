import {RouteComponentProps} from "react-router";
import {Train} from "./Train";
import React, {useContext, useEffect, useState} from "react";
import {ItemContext} from "./ItemProvider";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel
} from '@ionic/react';

interface ItemEditProps extends RouteComponentProps< {
    id?: string
}>{}

const ItemEdit: React.FC<ItemEditProps> = ({history, match}) => {
    const {items, saving, savingError, saveItem} = useContext(ItemContext)
    const [from, setfrom] = useState('');
    const [leavesAt, setleavesAt] = useState('');
    const [to, setto] = useState('');
    const [travelTime, settravelTime] = useState('');
    const [item, setItems] = useState<Train>();

    useEffect(() => {
        const routeId = match.params.id || '';
        const item = items?.find(it => it.id === routeId);
        setItems(item);
        if (item){
            setleavesAt(item.leavesAt);
            setfrom(item.from);
            setto(item.to);
            settravelTime(item.travelTime);
        }
    }, [match.params.id, items]);

    const handleSave = () => {
        const editedItem = item ? { ...item, from, leavesAt, to, travelTime } : { from, leavesAt, to, travelTime}
        saveItem && saveItem(editedItem).then(() => history.goBack());
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>from</IonLabel>
                <IonInput value={from} onIonChange={e => setfrom(e.detail.value || '')}/>
                <IonLabel>to</IonLabel>
                <IonInput value={leavesAt} onIonChange={e => setleavesAt(e.detail.value || '')}/>
                <IonLabel>leaves at</IonLabel>
                <IonInput value={to} onIonChange={e => setto(e.detail.value || '')}/>
                <IonLabel>travel time</IonLabel>
                <IonInput value={travelTime} onIonChange={e => settravelTime(e.detail.value || '')}/>
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || 'Failed to save item'}</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ItemEdit