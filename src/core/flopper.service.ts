/**

    Event Service
    -----------------------------------------------------------------
    Copyright (C) 2020 Coldmind AB <info@coldmind.com>
    Licensed under the GNU Lesser General Public License, Version 3.0
    Find a full copy of the license in the LICENSE.md file located in the project root.

    Author : Patrik Forsberg
    Email  : patrik.forsberg@coldmind.com
    GitHub : https://github.com/duffman

 */

import { DLog }            from "dina-common";
import { filter }          from "rxjs";
import { tap }             from "rxjs";
import { Subject }         from "rxjs";
import { Observable }      from "rxjs";
import { singleton }       from "tsyringe";
import { v4 as uuidv4 }         from 'uuid';
import { IFlopperEventService } from "..";
import { IFlopperEvent }        from "..";

@singleton()
export class FlopperService implements IFlopperEventService {
	public eventStream: Observable<IFlopperEvent<any>>;
	protected appEvent = new Subject<IFlopperEvent<any>>();
	private isDev?: boolean;

	constructor() {
		this.eventStream = this.appEvent.asObservable();
		this.isDev = process.env.NODE_ENV === 'development';
	}

	public onEvent(...types: number[]): Observable<IFlopperEvent> {
		return this.eventStream.pipe(
			tap(
				val => {
					if (this.isDev) DLog.debug("FlopperService :: ON EVENT TAP :::", val)
				}
			),
			filter((val: IFlopperEvent) => {
				return types.length ? types.indexOf(val.eventType) > -1 : true
			}),
		);
	}

	public publishEvent<T>(type: number, data?: any, message?: string): string {
		let event: IFlopperEvent<T> = {
			eventType   : type,
			eventMessage: message,
			eventData   : data
		}

		return this.pushEvent(event);
	}

	public pushEvent<T>(event: IFlopperEvent<T>): string {
		event.eventTag = uuidv4();
		if (this.isDev) DLog.debug("FlopperService :: EventServiceTs :: pushEvent", event);
		this.appEvent.next(event);
		return event.eventTag;
	}
}
