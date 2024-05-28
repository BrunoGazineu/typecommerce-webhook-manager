import { Observable } from "rxjs";

export interface IPublisher {
    emit<R = any, T = any>(pattern: string, data: T) : Observable<R>;
}