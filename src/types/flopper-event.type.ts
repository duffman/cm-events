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

export interface IFlopperEvent<T = void> {
	eventType: number;
	eventTag?: string;
	eventMessage?: string;
	eventData?: T
}
