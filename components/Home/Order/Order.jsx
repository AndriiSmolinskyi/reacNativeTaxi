import { OrderContext } from "../../Context/OrderContext";
import { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { StatusOrder } from "./StatusOrder";

export const Order = () =>{
    const {userData, auth,  request, setRequest, uid, setUid, status, setStatus} = useContext(OrderContext)
    
    const requestData = {
        user_full_name: userData.user_full_name,
        user_phone: userData.user_phone,
        comment: request.comm,
        payment_type: request.pay,
        flexible_tariff_name : request.tariff,
        extra_charge_codes: request.serviceAdd,
        route: request.road,
        taxiColumnId: request.taxiCol
    }
   
    const makeOrder = async () => {
        try {
            const response = await axios.post(`${ServerApi}/weborders`,requestData, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': auth,
                    'X-API-VERSION': '1.52.1'
                }
            })

            const responseData = response.data;
            const orderId = response.data.dispatching_order_uid
            setUid(orderId)
            console.log(orderId)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        if(!uid){
            makeOrder();
        }    
    }, []);

    
    return(
        <View>
            <StatusOrder></StatusOrder> 
        </View>    
    )
}

export default Order