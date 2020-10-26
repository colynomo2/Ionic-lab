import {RouteComponentProps} from "react-router";
import React, {useContext} from "react";
import {
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonLoading,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon
} from "@ionic/react";
import Item from "./Item"
import {ItemContext} from "./ItemProvider";
import {add} from "ionicons/icons";

const ItemList: React.FC<RouteComponentProps> = ({history}) => {
    const {items, fetching, fetchingError} = useContext(ItemContext);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Trains</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonLoading isOpen={fetching} message={"Loading trains"}/>
                {
                    items && (
                        <IonList>
                            {items.map(({id, from, to, leavesAt, travelTime}) =>
                                <Item key={id} id={id} from={from}
                                      to={to}
                                      leavesAt={leavesAt}
                                      travelTime={travelTime}
                                      onEdit={id => history.push(`/item/${id}`)}
                                />)}
                        </IonList>
                    )
                }
                {
                    fetchingError && (
                        <div>{fetchingError.message || 'Failed to fetch trains'}</div>
                    )
                }
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/item')}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
};

export default ItemList;