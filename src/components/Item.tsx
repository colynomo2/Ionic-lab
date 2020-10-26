import {Train} from "./Train";
import React from "react";
import {IonItem, IonLabel} from "@ionic/react";

interface TrainExt extends Train {
    onEdit: (id?: string) => void;
}

const Item: React.FC<TrainExt> = ({id, from, to, leavesAt, travelTime, onEdit}) => {
    return (
        <IonItem onClick={() => onEdit(id)}>
    <IonLabel>
        {from}
    </IonLabel>
    <IonLabel>
    {to}
    </IonLabel>
    <IonLabel>
    {leavesAt}
    </IonLabel>
    <IonLabel>
    {travelTime}
    </IonLabel>
    </IonItem>
);
};

export default Item;