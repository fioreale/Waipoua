PGDMP                         x           Waipoua    12.2    12.2 B    y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            {           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            |           1262    24757    Waipoua    DATABASE     �   CREATE DATABASE "Waipoua" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Italian_Italy.1252' LC_CTYPE = 'Italian_Italy.1252';
    DROP DATABASE "Waipoua";
                postgres    false            �            1259    25099    Association    TABLE     �   CREATE TABLE public."Association" (
    headquarter text NOT NULL,
    association_description text NOT NULL,
    ass_phone_number text NOT NULL,
    association_email text NOT NULL,
    association_name text NOT NULL
);
 !   DROP TABLE public."Association";
       public         heap    postgres    false            �            1259    25105    Association_Images    TABLE     �   CREATE TABLE public."Association_Images" (
    association_name text NOT NULL,
    "ID_image" integer NOT NULL
)
WITH (autovacuum_enabled='true');
 (   DROP TABLE public."Association_Images";
       public         heap    postgres    false            �            1259    25108    Event    TABLE     �  CREATE TABLE public."Event" (
    "ID_event" integer NOT NULL,
    event_presentation text,
    "ID_contact_person" integer NOT NULL,
    "event_ID_service" integer,
    event_name text NOT NULL,
    event_category integer NOT NULL,
    location text NOT NULL,
    day integer NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    hour integer NOT NULL,
    minute integer NOT NULL
);
    DROP TABLE public."Event";
       public         heap    postgres    false            �            1259    25114    Event_Category    TABLE     t   CREATE TABLE public."Event_Category" (
    "ID_category" integer NOT NULL,
    event_category_name text NOT NULL
);
 $   DROP TABLE public."Event_Category";
       public         heap    postgres    false            �            1259    25117    Event_Category_ID_category_seq    SEQUENCE     �   ALTER TABLE public."Event_Category" ALTER COLUMN "ID_category" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Event_Category_ID_category_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);
            public          postgres    false    205            �            1259    25365    Event_images    TABLE     r   CREATE TABLE public."Event_images" (
    "ID_event_category" integer NOT NULL,
    "ID_image" integer NOT NULL
);
 "   DROP TABLE public."Event_images";
       public         heap    postgres    false            �            1259    25269    Image    TABLE     `   CREATE TABLE public."Image" (
    "ID_image" integer NOT NULL,
    "URI_image" text NOT NULL
);
    DROP TABLE public."Image";
       public         heap    postgres    false            �            1259    25122    Person    TABLE     �   CREATE TABLE public."Person" (
    "ID_person" integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    description text,
    phone_number text,
    email text,
    "ID_role" integer NOT NULL
);
    DROP TABLE public."Person";
       public         heap    postgres    false            �            1259    25128    Person_ID_person_seq    SEQUENCE     �   ALTER TABLE public."Person" ALTER COLUMN "ID_person" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Person_ID_person_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);
            public          postgres    false    207            �            1259    25130    Role    TABLE     m   CREATE TABLE public."Role" (
    "ID_role" integer NOT NULL,
    role_name character varying(20) NOT NULL
);
    DROP TABLE public."Role";
       public         heap    postgres    false            �            1259    25311    Service    TABLE     �   CREATE TABLE public."Service" (
    "ID_service" integer NOT NULL,
    service_name text,
    service_presentation text,
    service_category integer NOT NULL
);
    DROP TABLE public."Service";
       public         heap    postgres    false            �            1259    25139    Service_Category    TABLE     p   CREATE TABLE public."Service_Category" (
    "ID_category" integer NOT NULL,
    category_name text NOT NULL
);
 &   DROP TABLE public."Service_Category";
       public         heap    postgres    false            �            1259    25145    donation    TABLE     �   CREATE TABLE public.donation (
    "ID_Transaction" integer NOT NULL,
    association_name character varying(30) NOT NULL,
    donor_name character varying(30) NOT NULL,
    earning integer NOT NULL,
    date date NOT NULL
);
    DROP TABLE public.donation;
       public         heap    postgres    false            �            1259    25148    donation_ID_Transaction_seq    SEQUENCE     �   ALTER TABLE public.donation ALTER COLUMN "ID_Transaction" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."donation_ID_Transaction_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000
    CACHE 1
);
            public          postgres    false    211            �            1259    25150    people_involved_in_services    TABLE     �   CREATE TABLE public.people_involved_in_services (
    "ID_Service_inv" integer NOT NULL,
    "ID_Person_inv" integer NOT NULL
);
 /   DROP TABLE public.people_involved_in_services;
       public         heap    postgres    false            �            1259    25380    person_images    TABLE     i   CREATE TABLE public.person_images (
    "ID_person" integer NOT NULL,
    "ID_image" integer NOT NULL
);
 !   DROP TABLE public.person_images;
       public         heap    postgres    false            �            1259    25296    service_images    TABLE     k   CREATE TABLE public.service_images (
    "ID_service" integer NOT NULL,
    "ID_image" integer NOT NULL
);
 "   DROP TABLE public.service_images;
       public         heap    postgres    false            f          0    25099    Association 
   TABLE DATA           �   COPY public."Association" (headquarter, association_description, ass_phone_number, association_email, association_name) FROM stdin;
    public          postgres    false    202   jR       g          0    25105    Association_Images 
   TABLE DATA           L   COPY public."Association_Images" (association_name, "ID_image") FROM stdin;
    public          postgres    false    203   �S       h          0    25108    Event 
   TABLE DATA           �   COPY public."Event" ("ID_event", event_presentation, "ID_contact_person", "event_ID_service", event_name, event_category, location, day, month, year, hour, minute) FROM stdin;
    public          postgres    false    204   	T       i          0    25114    Event_Category 
   TABLE DATA           N   COPY public."Event_Category" ("ID_category", event_category_name) FROM stdin;
    public          postgres    false    205   W       u          0    25365    Event_images 
   TABLE DATA           I   COPY public."Event_images" ("ID_event_category", "ID_image") FROM stdin;
    public          postgres    false    217   pW       r          0    25269    Image 
   TABLE DATA           :   COPY public."Image" ("ID_image", "URI_image") FROM stdin;
    public          postgres    false    214   �W       k          0    25122    Person 
   TABLE DATA           k   COPY public."Person" ("ID_person", name, surname, description, phone_number, email, "ID_role") FROM stdin;
    public          postgres    false    207   �[       m          0    25130    Role 
   TABLE DATA           6   COPY public."Role" ("ID_role", role_name) FROM stdin;
    public          postgres    false    209   da       t          0    25311    Service 
   TABLE DATA           g   COPY public."Service" ("ID_service", service_name, service_presentation, service_category) FROM stdin;
    public          postgres    false    216   �a       n          0    25139    Service_Category 
   TABLE DATA           J   COPY public."Service_Category" ("ID_category", category_name) FROM stdin;
    public          postgres    false    210   �h       o          0    25145    donation 
   TABLE DATA           a   COPY public.donation ("ID_Transaction", association_name, donor_name, earning, date) FROM stdin;
    public          postgres    false    211   �h       q          0    25150    people_involved_in_services 
   TABLE DATA           X   COPY public.people_involved_in_services ("ID_Service_inv", "ID_Person_inv") FROM stdin;
    public          postgres    false    213   �h       v          0    25380    person_images 
   TABLE DATA           @   COPY public.person_images ("ID_person", "ID_image") FROM stdin;
    public          postgres    false    218   Ui       s          0    25296    service_images 
   TABLE DATA           B   COPY public.service_images ("ID_service", "ID_image") FROM stdin;
    public          postgres    false    215   �i       }           0    0    Event_Category_ID_category_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."Event_Category_ID_category_seq"', 1, false);
          public          postgres    false    206            ~           0    0    Person_ID_person_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Person_ID_person_seq"', 1, false);
          public          postgres    false    208                       0    0    donation_ID_Transaction_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."donation_ID_Transaction_seq"', 1, false);
          public          postgres    false    212            �
           2606    25250    Association Association_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Association"
    ADD CONSTRAINT "Association_pkey" PRIMARY KEY (association_name);
 J   ALTER TABLE ONLY public."Association" DROP CONSTRAINT "Association_pkey";
       public            postgres    false    202            �
           2606    25160 "   Event_Category Event_Category_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."Event_Category"
    ADD CONSTRAINT "Event_Category_pkey" PRIMARY KEY ("ID_category");
 P   ALTER TABLE ONLY public."Event_Category" DROP CONSTRAINT "Event_Category_pkey";
       public            postgres    false    205            �
           2606    25369    Event_images Event_images_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public."Event_images"
    ADD CONSTRAINT "Event_images_pkey" PRIMARY KEY ("ID_event_category", "ID_image");
 L   ALTER TABLE ONLY public."Event_images" DROP CONSTRAINT "Event_images_pkey";
       public            postgres    false    217    217            �
           2606    25162    Event Event_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("ID_event");
 >   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_pkey";
       public            postgres    false    204            �
           2606    25166    Person Person_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("ID_person");
 @   ALTER TABLE ONLY public."Person" DROP CONSTRAINT "Person_pkey";
       public            postgres    false    207            �
           2606    25168    Role Role_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("ID_role");
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            postgres    false    209            �
           2606    25170 &   Service_Category Service_Category_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."Service_Category"
    ADD CONSTRAINT "Service_Category_pkey" PRIMARY KEY ("ID_category");
 T   ALTER TABLE ONLY public."Service_Category" DROP CONSTRAINT "Service_Category_pkey";
       public            postgres    false    210            �
           2606    25174    donation donation_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.donation
    ADD CONSTRAINT donation_pkey PRIMARY KEY ("ID_Transaction");
 @   ALTER TABLE ONLY public.donation DROP CONSTRAINT donation_pkey;
       public            postgres    false    211            �
           2606    25176 <   people_involved_in_services people_involved_in_services_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.people_involved_in_services
    ADD CONSTRAINT people_involved_in_services_pkey PRIMARY KEY ("ID_Person_inv", "ID_Service_inv");
 f   ALTER TABLE ONLY public.people_involved_in_services DROP CONSTRAINT people_involved_in_services_pkey;
       public            postgres    false    213    213            �
           2606    25384     person_images person_images_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.person_images
    ADD CONSTRAINT person_images_pkey PRIMARY KEY ("ID_person", "ID_image");
 J   ALTER TABLE ONLY public.person_images DROP CONSTRAINT person_images_pkey;
       public            postgres    false    218    218            �
           2606    25276    Image pk_image 
   CONSTRAINT     V   ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT pk_image PRIMARY KEY ("ID_image");
 :   ALTER TABLE ONLY public."Image" DROP CONSTRAINT pk_image;
       public            postgres    false    214            �
           2606    25300 "   service_images service_images_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.service_images
    ADD CONSTRAINT service_images_pkey PRIMARY KEY ("ID_image", "ID_service");
 L   ALTER TABLE ONLY public.service_images DROP CONSTRAINT service_images_pkey;
       public            postgres    false    215    215            �
           2606    25318    Service service_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT service_pkey PRIMARY KEY ("ID_service");
 @   ALTER TABLE ONLY public."Service" DROP CONSTRAINT service_pkey;
       public            postgres    false    216            �
           2606    25256    donation Association Name    FK CONSTRAINT     �   ALTER TABLE ONLY public.donation
    ADD CONSTRAINT "Association Name" FOREIGN KEY (association_name) REFERENCES public."Association"(association_name);
 E   ALTER TABLE ONLY public.donation DROP CONSTRAINT "Association Name";
       public          postgres    false    2752    211    202            �
           2606    25261 #   Association_Images Association Name    FK CONSTRAINT     �   ALTER TABLE ONLY public."Association_Images"
    ADD CONSTRAINT "Association Name" FOREIGN KEY (association_name) REFERENCES public."Association"(association_name) NOT VALID;
 Q   ALTER TABLE ONLY public."Association_Images" DROP CONSTRAINT "Association Name";
       public          postgres    false    202    203    2752            �
           2606    25188 %   people_involved_in_services ID person    FK CONSTRAINT     �   ALTER TABLE ONLY public.people_involved_in_services
    ADD CONSTRAINT "ID person" FOREIGN KEY ("ID_Person_inv") REFERENCES public."Person"("ID_person") NOT VALID;
 Q   ALTER TABLE ONLY public.people_involved_in_services DROP CONSTRAINT "ID person";
       public          postgres    false    207    2758    213            �
           2606    25370    Event_images ID_Image_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event_images"
    ADD CONSTRAINT "ID_Image_fk" FOREIGN KEY ("ID_image") REFERENCES public."Image"("ID_image");
 F   ALTER TABLE ONLY public."Event_images" DROP CONSTRAINT "ID_Image_fk";
       public          postgres    false    214    217    2768            �
           2606    25329 &   people_involved_in_services ID_Service    FK CONSTRAINT     �   ALTER TABLE ONLY public.people_involved_in_services
    ADD CONSTRAINT "ID_Service" FOREIGN KEY ("ID_Service_inv") REFERENCES public."Service"("ID_service") NOT VALID;
 R   ALTER TABLE ONLY public.people_involved_in_services DROP CONSTRAINT "ID_Service";
       public          postgres    false    2772    216    213            �
           2606    25375    Event_images ID_category_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event_images"
    ADD CONSTRAINT "ID_category_fk" FOREIGN KEY ("ID_event_category") REFERENCES public."Event_Category"("ID_category");
 I   ALTER TABLE ONLY public."Event_images" DROP CONSTRAINT "ID_category_fk";
       public          postgres    false    217    2756    205            �
           2606    25306    service_images ID_image    FK CONSTRAINT     �   ALTER TABLE ONLY public.service_images
    ADD CONSTRAINT "ID_image" FOREIGN KEY ("ID_image") REFERENCES public."Image"("ID_image");
 C   ALTER TABLE ONLY public.service_images DROP CONSTRAINT "ID_image";
       public          postgres    false    214    2768    215            �
           2606    25390    person_images ID_image    FK CONSTRAINT     �   ALTER TABLE ONLY public.person_images
    ADD CONSTRAINT "ID_image" FOREIGN KEY ("ID_image") REFERENCES public."Image"("ID_image");
 B   ALTER TABLE ONLY public.person_images DROP CONSTRAINT "ID_image";
       public          postgres    false    214    2768    218            �
           2606    25385    person_images ID_person    FK CONSTRAINT     �   ALTER TABLE ONLY public.person_images
    ADD CONSTRAINT "ID_person" FOREIGN KEY ("ID_person") REFERENCES public."Person"("ID_person");
 C   ALTER TABLE ONLY public.person_images DROP CONSTRAINT "ID_person";
       public          postgres    false    207    2758    218            �
           2606    25342    Event ID_service    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "ID_service" FOREIGN KEY ("event_ID_service") REFERENCES public."Service"("ID_service") ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;
 >   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "ID_service";
       public          postgres    false    216    204    2772            �
           2606    25203    Event event_category    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT event_category FOREIGN KEY (event_category) REFERENCES public."Event_Category"("ID_category") NOT VALID;
 @   ALTER TABLE ONLY public."Event" DROP CONSTRAINT event_category;
       public          postgres    false    2756    205    204            �
           2606    25208    Event id_contact_person    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT id_contact_person FOREIGN KEY ("ID_contact_person") REFERENCES public."Person"("ID_person") NOT VALID;
 C   ALTER TABLE ONLY public."Event" DROP CONSTRAINT id_contact_person;
       public          postgres    false    204    2758    207            �
           2606    25282    Person id_image    FK CONSTRAINT     �   ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT id_image FOREIGN KEY ("ID_person") REFERENCES public."Image"("ID_image") NOT VALID;
 ;   ALTER TABLE ONLY public."Person" DROP CONSTRAINT id_image;
       public          postgres    false    207    2768    214            �
           2606    25213    Person id_role    FK CONSTRAINT     �   ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT id_role FOREIGN KEY ("ID_role") REFERENCES public."Role"("ID_role") NOT VALID;
 :   ALTER TABLE ONLY public."Person" DROP CONSTRAINT id_role;
       public          postgres    false    209    207    2760            �
           2606    25337    Service service_category    FK CONSTRAINT     �   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT service_category FOREIGN KEY (service_category) REFERENCES public."Service_Category"("ID_category") NOT VALID;
 D   ALTER TABLE ONLY public."Service" DROP CONSTRAINT service_category;
       public          postgres    false    2762    210    216            f   r  x�5�1o�0��_�F$@ө�!C�N͒��yY4D������$�����Bx�i���-^%R�ß�w�U+acXɚ�x�'G�3C�nu��M�F�Ȳ�XP��Y\�p*hݟZ������}I��0J3O��Z�uG��������L�����f�:�3�);��$���Y
@�1�������2�-u�.M����z��ޱ��^���Z	��rj*�q_t�ƻm�6	�r���+��O��Mj3A�8�1>˕u�����xy~�9�\+Z'�l���<��j8�����}�����1����z�MHR��V��[�逿��ܹ��޴�����~>�LG�v��m�$�����a���x����      g      x������ � �      h   �  x�uT�jA}�|����Ӵi^B(M����Pȋ���N<;c�b�o��B�s��Jڵ(��`��H:�hf��6�-�u(x�@(z��^���
~t|��V.�Byz��8������`�<=��2����hC>O��>gA�J\G����B�З��Rnr�pKq
����/%��!S�!w�76�3���!���Sx�I[�t��U$NGo{t�n��6DJ9�Y��,��s%3��C��%FV��& OM��k1P&J����}5�����97?-�r9bo�:�/֡f~aޙ�l>3չ��T�N5������S��H��)M�^����q'�Fe�VM5�j�򬊫����-�6�(�5��8Ѕ�zl�c�Ap�m`*�q�c��ym.̷!g@2g/M^��Fˣ�UF���k}�ܑ�`m[>	51Kr��v�f�)��O<l�K�\�%5Nb��gr0*=p]fP`�p;F�OǕ^)-l���l�&R���z߱t$}.H�a�q���,R�qi����Y��� O��? �N��`,��q%Vv��I�b���_��p�{��o.׵~��j�]K��z[�.���T�|G����a��ɲd�	�t_�иm��Z�����:
��E�*vM"�ê��6��z�G��k�̏Y���Kt�>+���d݀u�6�����7!�P[T�m��g��0!�8�l�"�����,ܸ�Y��{Ŭ��{�m�E���>/�:�o`��z7=99����u      i   U   x�3�t���M�Q(�/IM.����2�t�/J-.A3����)�M8�J�R�3�3�ҹL9���3A�
E���`e1z\\\ 3 >      u   4   x���� C�s~1>Q �^��9̐7C�<ruټ��K1�t1K>e�]����      r   �  x����r�0F����!����63��V���\�&!O_!b#y?���c��lv�c>Q*d��K���/t��\��P���sU��<��n$�N�}�6<�.siUF&ݨ�_�R�iIP]�LQ���-���_��_�P�J��z^v��e�j�%M:H�y�P��(�m�B���_��$��椟���W`�Z[�*��%O�iM'q�2�_Av����]�!Q�,3exm�2W\f.��[D� �+�%�Dh�&�.�:T����ׄQж�>�5�%�^h乽Mc�pσ>�di�G`(�@W�Ch���CF b���d ���� `G�rF���fh<�axG�3X�ΈP���^U�� ��ߖJ�܄s�������]/����]Ng����>ˮ���^B�W�Z�Ϫ4�7~�7�پ��d�-}�.�N&�)��J�+]�v�'�����QP�48,u�廱�N�g�J@]��T���@�0�J���F��V2S�q#�"�9cd_)Tg�d�B�ޕ�Bmᮨ-td���B7��p�[�FA��^�^�"�P�$֗�Hb}aP�6�	l��V7�2���&B'P_� Cl�PC��5��r"J��$�u+�AUR�P����얕R��4W�����ތ����:#$[4�ȚV�uZ��'E����$(�PhQ-I|P� �: 薷�� �ۀ{����(���=�J�K����2���AUFѾP(��J��y��	����v�=�?��6��WD8���^A��',��~��Â�+Wi�>�0�����������aHC!ҏ[!
���2!6�Y$d�ߋ�8<0Rw����p�	�Iw�`����9�Cړ8C.q�O��|z���?[8
o'��GE���08/���pV�u_.���}<F�Ac��(�`�ǁ>�ap$��`�ǂ>�Ѡ�hO�|5�DG#��8��_j���h���w��z�$�E����IB5s      k   �  x��W˒�6<S_����ڗ}�:���^�+�ؕT.#"�% %˧�F~/_� �H{��J��===���5)��6]���SF��b�Lc*�0[Q�JK'���R�-59Á�N4f/K�������exXY*;\V
���pᑿު�� �� ���"�	���-ji�%�Q� �Yls�P��8(����ƭ����4M�O�l�^?���Z���9#��@jg:ʍ����YvS���^�V��F��������HF#��/E�)�sc�0Ț�0b�� �Q��O�Q8�)��A`S�Ɣ���J�0�R�]�Nl�i������7��͎�8�\ D�s��Z�񢸋?�C�`�9�FL�#�<��pq�Xg/e)�*t�;�^��%��|�=a�rq��W�C�&{Nz��^�-�r �L��R��8��������.N�dZ�D��\�4!�&	z���O�V|�=���Q1=/�i����l��^8�cV٭ќ�W��I�Ui�ٍEfaVǢ�;>�$��k����bV�'3�8�V������@�Gy`��%%(q
�d	�5P�>�EB˃��2jA����gEa��
��3�|ub�2!��n��ٛN9�n��T�3�ap^��^�a7�����D��-�����B��6�|�ki��h���p2Jl)�N)>���1�Tl蜀X@���\n'Z�"�<��p�Z\A(TR�����G�PpW'��
�b)����:ƥ���Ͽ��������V�"8��:���� �/wQ�Is�������=N8�#�<!��^\g�%Җ�*Ig��M�;�˴G4D��	g)xH�!16�.��h�8�}�!�$g9`Y���SmMW�	0�Lf�@聓�5�B�� ��n{@�����a6cՎ��4B�#�	���i��t�?��B�U�b�ج��菅�����z(�����k?�ϩ�������)�YWO�;����=5�����޾�1g)ҞI?���fp�����0�_�kln���(��4&=��޳��标I(j����&�����i��"��c
�1�h�XR|��"����W==y�g�V+؞��* ��)���$	f�c��p��lp:�z׸��SX@�zUt�䌽)��(w�q�OV��V26�M�'��7�"� �'�g#hy�6��Vg��i������4#�z�#�[E����	�<q�<Et�M.E����@��*²��%M�R��c�S��b��6{�mL��NZ�0Ŭ\�y���^E�CotCI���r7=,l1�@�>�u�k��V>���"��cɇk�ô0��x����V�숈�3�8g���<�UU'��?���^��i �����^��9ƒ�lPh)�U���D��K�y��Ҟa*t�*���k/���xa=�%`l��S��Hp�w�����|�X��:�      m   \   x�3�t��LM�2��LN�2�)JM,.-J-�2�K-�2�t����O�,.�2*N���9�R�+�sR\+
R�J�,8��sJ�JR�c���� �!�      t   �  x�uWM��6=k����&�LN�v���&�d��^(	��K	
I����>��lo�3������~V}��I�'�6�X}⑒);��z��t�L�q���5���́�2%�_י4�h;�4���I�ց�~H������j�d���Ա\ 7�f^����-7%6�M0�7�_!á��_��U6��Z8�pF|`�)��x�8�b�ކ8�9����f��5Pq�&3gH���H��|>�4��&P���}o)R8о�����8�S����F_��6B�>с�VN�u.�`�,ֻ������TgG^�� �ew�pڛ��m�{�aAms�Z����`G���wxIP�-�=5�`�-�I�<���0������C&��S�O@�;��l�<���l*Hp��� ,3�o�j��v�֐�N���M�'���+~n�.��xf�.Y�|U��Iَ�+����{.- O�������.�Ā�WZ��23I��jq���2����e��K�.�6a!�N?t��3n�^�)�<��Κ��� �� (��\��%z��&���xNW�`�ɳ;ð�	���e�ZMn��pU���0�,���jZ�!	�,E �j��YZ���r[R.��-tP����F����8/ng�M�u�]��{82/�J�D�����/k�,J����Dj)J[�V�be�����w�@z/�(� E4��>P��p��s�"�9��χDHD�q	[�Е2��c��[E\!2�0�	DFp�Pj��T]��]����K�]�|��ae�\%Q����i��G:�R~Y��C���M�`�h� &��(e,�pP����.n�����+Z��H�ߡ!Ya�"�&<�w�BD�Kwɥ���N=�U���6{󙡉��lC��O�B+s���_Jy����rvn�sfB"�s!XIq�}��2J�e֋�}�����z_�����,iW+�X�a�Zv�}��q�P���;c�N]�v���݌�P=*c���X�)�)�|���.^�&6f�o�����h�5��g���(Kh)Ȃ=��F�`�K�Q����uU�>g�N��#O.IOc�@�GK�@����S�	A�<� �k��0���hx�+q���#5�FF���e���+WK-f�0��tz�6�H/��qZ-��y��,Ʀ�gp *Z�oErP�,
�GDA���KY�s�׽/w.��I�+Sz��xi*Ym/�h��Xh���>Q4��N���	B��腧��yJ�����vdP��-IzR�- �A�pp_����z�V�ޫ��lQ� �c�BW��Մa���2��u�l,�����htHE	���Z�R���\���:� tHݤ�Ҳ-B.S����d���J~Y$`t��،h�0יD;Qi�6FF���'�^��n���<�&��6
���Yu[�-����Y��F�i4Ի���z^�)m՞�W?16GE���e���Mw�����2j=�:������׷5�[T���\d�"k��r�
C}����*O���߽��^�yq�=7�0V���k7����PJyQ;qn<W4���a�t槖���ѹ�&)v��:�Ñ�O����f� v�/�Tk��8��+ϫ?��)D$\YX3�1�ӷkyb;beDR"�BO���)x�%T?�J��u������J[8�9�@V�Nh$˽׶x#c�J�t��/�jK���=�������?e~;      n   3   x�3�t���M�Q(�/IM.����2�t�/J-.A3����)�c���� /��      o      x������ � �      q   N   x����0B�0Le�4�]���9�,�AQ2ɲ�[�T6�rX��praQ�ݵm�X
w�ɏƁ���������G��      v   X   x�Ĺ1AF�Y��\�q�l�ˈ�%��7�_�]�W�C�i�*n�{��F������Q��&��&ǠZo�)�~����,?���      s   �   x�%ϻ@����?���&͓eɅy�#OPKE��t��pK+�� 	j�`'KP��,m�P������,�,�\�.�2�M���/�xHg1$�Kˣ��N?��>�;ή�ꯝ~�ޑ,�     