import { Injectable } from '@angular/core';
import { ActionPerformed,
          PushNotificationSchema,
          PushNotifications,
          Token } from '@capacitor/push-notifications';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications'
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private platform: Platform
  ) { }

  init(){
    //Pide permisos en el sistema.
    if(this.platform.is('capacitor')){

      PushNotifications.requestPermissions().then(result => {
        if(result.receive === 'granted'){
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration', (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      });
    }
    else{
      console.log('No se pueden otorgar permisos');
    }
  }

  initLocal(){
    LocalNotifications.requestPermissions();
  }
  
  local(){
    console.log('Evento de notificacion local');
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Notificacion local.',
          body: 'Esto es una prueba de notificaciones locales con Capacitor.',
          id: 1,
          extra: {
            data: '#000000'
          }
        }
      ]
    });
  }
}
