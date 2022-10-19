/**

    Event Service - Types
    -----------------------------------------------------------------
    Copyright (C) 2020 Coldmind AB <info@coldmind.com>
    Licensed under the Mozilla Public License, Version 2.0
    Find a full copy of the license in the LICENSE.md file located in the project root.

    Author : Patrik Forsberg
    Email  : patrik.forsberg@coldmind.com
    GitHub : https://github.com/duffman

 */

import { Observable }    from "rxjs";
import { IFlopperEvent } from "./flopper-event.type";

export interface IFlopperEventService {
	eventStream: Observable<IFlopperEvent>;
	onEvent(...types: number[]): Observable<IFlopperEvent>;
	publishEvent(type: number, data?: any, message?: string): string;
	pushEvent(event: IFlopperEvent): string;
}
