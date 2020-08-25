create or replace
function BTBI0002 (v_date IN varchar2, v_eigyo_cd IN varchar2) RETURN NUMBER IS
/*****************************************************
	BTBI 日次データ取込処理（日別路線別実績集計）
******************************************************/
v_company varchar2(10);
v_base varchar2(10);
V_st_date varchar2(10)

Begin
	select NAME_1, NAME_2 into v_company, v_base from m_cd_name
	Where Name_Key = V_Eigyo_Cd And
	MASTER_KBN = '0030';


	DELETE FROM T_DAY_ROUTE_AMOUNT
	WHERE
		T_DATE BETWEEN '20' || TO_CHAR(To_Number(V_Date)-1) And '20' || v_date and
		COMPANY_CD = v_company and
		BASE_CD  = v_base;

	insert into T_DAY_ROUTE_AMOUNT
	SELECT
		'20' || T1.OPE_DATE as T_DATE,
		v_company as COMPANY_CD,
		v_base as BASE_CD,
		T2.ROUTE_CD,
		T1.DATA_TYPE,
		SUM(T1.REQUEST_CASH) as AMOUNT,
		SUM(T1.ADULT_CNT) as ADULT_CNT,
		SUM(T1.CHILD_CNT) as CHILD_CNT,
		SUM(T1.DISADULT_CNT) as DISADULT_CNT,
		SUM(T1.DISCHILD_CNT) as DISCHILD_CNT,
		SYSTIMESTAMP as REG_DATE,
		'SYSTEM' as REG_ID,
		'BTBI0002' as REG_PROC
	FROM
		T_UNCHIN T1
	LEFT JOIN
		M_LINE T2
	ON
		To_Number(T1.Line_Num) = To_Number(T2.Line_Num)
	Where
		T1.Ope_Date between TO_CHAR(To_Number(V_Date)-1) And V_Date AND
		T1.Eigyo_Code = V_Eigyo_Cd And
    T2.ROUTE_CD IS NOT NULL
	GROUP BY
		T1.OPE_DATE,
		T1.EIGYO_CODE,
		T2.ROUTE_CD,
		T1.DATA_TYPE;

		Return 0;

EXCEPTION
	WHEN OTHERS THEN
	Update T_Import_Status Set
			STATUS_CD = '99',
			UPD_DATE = SYSTIMESTAMP,
			UPD_ID = 'SYSTEM',
			UPD_PROC = 'BTBI0002'
		where
			T_DATE = v_date and
			EIGYO_CODE = v_eigyo_cd;
		Return 1;
END;
