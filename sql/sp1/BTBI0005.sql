create or replace function BTBI0005 (v_date IN varchar2, v_eigyo_cd IN varchar2) RETURN NUMBER IS
/*****************************************************
	BTBI 月次データ取込処理（月次路線別実績集計）
******************************************************/
v_company varchar2(10);
v_base varchar2(10);

Begin
	select NAME_1, NAME_2 into v_company, v_base from m_cd_name
	Where Name_Key = V_Eigyo_Cd And
	MASTER_KBN = '0030';

	DELETE FROM T_DAY_ROUTE_AMOUNT
	WHERE
		T_MONTH = '20' || substr(v_date,1,4) and
		COMPANY_CD = v_company and
		BASE_CD  = v_base;

	insert into T_MONTH_ROUTE_AMOUNT
	SELECT
		'20' || substr(T1.OPE_DATE,1,4) as T_MONTH,
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
		'BTBI0005' as REG_PROC
	FROM
		T_UNCHIN T1
	LEFT JOIN
		M_LINE T2
	ON
		To_Number(T1.Line_Num) = To_Number(T2.Line_Num)
	WHERE
		T1.Ope_Date = V_Date And
		T1.Eigyo_Code = V_Eigyo_Cd And
    T2.ROUTE_CD IS NOT NULL
	GROUP BY
		substr(T1.OPE_DATE,1,4),
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
