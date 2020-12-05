delete from app_order;
delete from public.app_user;
delete from app_table;
delete from beer;
delete from session_event;

INSERT INTO public.beer (id, alcohol_percentage, amortization_factor, base_price, blg, brewery, description, ebc, ibu, max_price, min_price, name, product_state, origin, photo, type, year) VALUES ('1a07312b-3764-4976-b08c-7ee9cd1de412', 5.5, 5, 12, 8, 'Brovar', 'The aroma of craft beer comes mainly from the hops, malt, and yeast strain.', 8, 12, 21, 7, 'Brovar', 'ON_STORE', 'USA', null, 'Dark', '2010');
INSERT INTO public.beer (id, alcohol_percentage, amortization_factor, base_price, blg, brewery, description, ebc, ibu, max_price, min_price, name, product_state, origin, photo, type, year) VALUES ('d3e39bee-32a9-4e72-911f-00b6ebf57e60', 5.5, 5, 12, 8, 'Camerg', 'The aroma of craft beer comes mainly from the hops, malt, and yeast strain.', 8, 12, 21, 7, 'Camerg', 'ON_STORE', 'USA', null, 'Dark', '2010');
INSERT INTO public.beer (id, alcohol_percentage, amortization_factor, base_price, blg, brewery, description, ebc, ibu, max_price, min_price, name, product_state, origin, photo, type, year) VALUES ('411075a0-5b19-40ea-aa37-5f51fcb506f2', 5.5, 5, 12, 8, 'Pilsner', 'The aroma of craft beer comes mainly from the hops, malt, and yeast strain.', 8, 12, 21, 7, 'Pilsner', 'ON_STORE', 'USA', null, 'Dark', '2010');
INSERT INTO public.beer (id, alcohol_percentage, amortization_factor, base_price, blg, brewery, description, ebc, ibu, max_price, min_price, name, product_state, origin, photo, type, year) VALUES ('411075a0-5b19-40ea-aa37-5f51fcb506f3', 6.0, 5, 11, 8.5, 'Tyskie Brewery Group', 'Polish brand beer. Its name comes from the brewery located in the Upper Silesian town of Tychy', 9, 10.5, 20, 5, 'Tyskie', 'ON_STORE', 'Poland', null, 'Light', '2008');
INSERT INTO public.beer (id, alcohol_percentage, amortization_factor, base_price, blg, brewery, description, ebc, ibu, max_price, min_price, name, product_state, origin, photo, type, year) VALUES ('411075a0-5b19-40ea-aa37-5f51fcb506f4', 5.9, 5, 13, 9, 'Velkopopovický Kozel', ' Czech lager produced since 1874. The brewery was founded by František Ringhoffer in Velké Popovice, a town 25 km southeast of Prague. Their symbol is a goat. The company was bought by SABMiller in 2002 and sold to Asahi Breweries in 2016. ', 10, 11.5, 26, 8, 'Kozel', 'ON_STORE', 'Czech Republic', null, 'Lager', '2006');

insert into app_table(table_number, seats) values (1, 1);
insert into app_table(table_number, seats) values (2, 1);

insert into public.app_user(user_type, id, email, first_name, last_name, login, password, phone_number, table_table_number) values ('BARTENDER','7175c66d-29fe-4e0e-82fe-83736513c2f5','email','bartek','lagosz','admin','$2a$10$0JZhi20JVHUvBONl7XLBhOAwSgmH7dtg/dTgj9qCptKXo1JLLH/2e',123123123, null);
insert into public.app_user (user_type, id, email, first_name, last_name, login, password, phone_number, table_table_number) values ('CLIENT', '6e0b7333-8214-45b8-9344-3757d42c7ce9', 'a@b.com', 'a', 'b', 'a', '$2a$10$OOunjBzlAIlNp/qLwvcOXecv0aS772nWpWmfIicaAJPxUQkt6l8SC', 567890123, 1);
insert into public.app_user (user_type, id, email, first_name, last_name, login, password, phone_number, table_table_number) values ('CLIENT', '9ef5e06c-011b-4d80-919e-3589d8929bdf', '1', '1', '1', 'szymon', '$2a$10$.VBYLDZ9F/v89KS.W21rCe3M3fAkzNAK32QXXQdWR7gBZN9VwRSKi', 1, null);
insert into public.app_user (user_type, id, email, first_name, last_name, login, password, phone_number, table_table_number) values ('OWNER', '247fa3d3-2191-4fc5-8c3b-c651b5f06f67', 1, 1, 1, 'w', '$2a$10$xV6L5J5dHvXxDu3pMmJBE.CqWt1SKKA7t40YVilgU2kUfjMQ6COWC', 1, null);


insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('5a631bab-3f17-4f75-8a21-e85d634962ab', 1, '2020-11-11 21:43:12.766000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', 'd3e39bee-32a9-4e72-911f-00b6ebf57e60');
insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('66800d85-2f1c-485b-833d-5b6a3e7f601a', 1, '2020-11-11 21:47:53.772000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', '411075a0-5b19-40ea-aa37-5f51fcb506f2');
insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('d7884a93-712b-4d86-9f38-2c54e5d4c00d', 1, '2020-11-11 21:48:07.997000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', '411075a0-5b19-40ea-aa37-5f51fcb506f2');
insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('1c3ae402-5601-4bf7-8a4a-aaf5e7470088', 1, '2020-11-11 21:48:31.602000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', '1a07312b-3764-4976-b08c-7ee9cd1de412');
insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('835af642-857f-4d04-868f-701b346362d4', 1, '2020-11-11 21:48:32.772000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', '1a07312b-3764-4976-b08c-7ee9cd1de412');
insert into public.app_order (id, amount, bought_date, order_state, order_view_id, price, client_id, product_id) values ('f56a8902-4afb-4928-b9b1-1d17108c058d', 1, '2020-11-11 21:48:34.027000', 'WAITING', 321, 10, '6e0b7333-8214-45b8-9344-3757d42c7ce9', '1a07312b-3764-4976-b08c-7ee9cd1de412');
insert into public.session_event(id, date, type) values ('1a07312b-3764-4976-b08c-7ee9cd1de412', '2020-11-11 21:43:12.766000', 'START');
