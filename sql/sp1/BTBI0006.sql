create or replace function BTBI0006 (v_date IN varchar2, v_eigyo_cd IN varchar2) RETURN NUMBER IS
/*****************************************************
	BTBI 月次データ取込処理（月次系統別実績集計）
******************************************************/
v_company varchar2(10);
v_base varchar2(10);

BEGIN
select NAME_1, NAME_2 into v_company, v_base from m_cd_name
	where NAME_KEY = v_eigyo_cd and
	MASTER_KBN = '0030';

	DELETE FROM T_MONTH_LINE_AMOUNT
	WHERE
		T_MONTH = '20' || substr(v_date,1,4) and
		COMPANY_CD = v_company and
		BASE_CD  = v_base;

	insert into T_MONTH_LINE_AMOUNT
	SELECT
		'20' || substr(T1.OPE_DATE,1,4) as T_MONTH,
		v_company as COMPANY_CD,
		v_base as BASE_CD,
		T1.LINE_NUM,
		T1.DATA_TYPE,
		SUM(T1.REQUEST_CASH) as AMOUNT,
		SUM(T1.ADULT_CNT) as ADULT_CNT,
		SUM(T1.CHILD_CNT) as CHILD_CNT,
		SUM(T1.DISADULT_CNT) as DISADULT_CNT,
		SUM(T1.DISCHILD_CNT) as DISCHILD_CNT,
		SYSTIMESTAMP as REG_DATE,
		'SYSTEM' as REG_ID,
		'BTBI0003' as REG_PROC
	FROM
		T_UNCHIN T1
	WHERE
		T1.OPE_DATE = v_date and
		T1.EIGYO_CODE = v_eigyo_cd
	GROUP BY
		substr(T1.OPE_DATE,1,4),
		T1.EIGYO_CODE,
		T1.LINE_NUM,
		T1.DATA_TYPE;

		Return 0;

EXCEPTION
	WHEN OTHERS THEN
	Update T_Import_Status Set
			STATUS_CD = '99',
			UPD_DATE = SYSTIMESTAMP,
			UPD_ID = 'SYSTEM',
			UPD_PROC = 'BTBI0003'
		where
			T_DATE = v_date and
			EIGYO_CODE = v_eigyo_cd;
		Return 1;
END;
